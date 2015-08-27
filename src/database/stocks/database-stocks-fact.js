Stocks.factory('StocksService', function ($http, $q) {
    var svc = this;

    svc.getStocks = function (query) {
        var deferred = $q.defer();

        //TODO: find a better way to do this that's less hacky
        //Hacky way to convince browser that the yahoo framework is installed.
        //Pollutes the window scope slightly, but shouldn't be a big deal, mostly.
        //In addition, this approach calls the function for every update; probably should be debounced.
        window.YAHOO = {
            Finance: {
                SymbolSuggest: {
                    ssCallback: function (data) {
                        deferred.resolve(data.ResultSet.Result);

                        if (data.ResultSet.Result.length > 0) {
                            svc.getSymbolValues(_.pluck(data.ResultSet.Result, 'symbol')).then(function (symbols) {
                                _.times(symbols.data.length, function (index) {
                                    if (symbols.data[index]) {
                                        data.ResultSet.Result[index].value = symbols.data[index].l;
                                        data.ResultSet.Result[index].changePercentage = symbols.data[index].cp;
                                    }
                                });
                            });
                        }
                    }
                }
            }
        };

        $http({
            method: 'JSONP',
            url: 'http://d.yimg.com/autoc.finance.yahoo.com/autoc',
            params: {
                query: query,
                callback: 'YAHOO.Finance.SymbolSuggest.ssCallback'
            }
        });

        return deferred.promise;
    };

    //Get symbol values given an array of symbols
    //TODO: reuse the code in server.js
    svc.getSymbolValues = function (symbols) {
        return $http({
            method: 'JSONP',
            url: '//finance.google.com/finance/info',
            params: {
                q: symbols.join(','),
                callback: 'JSON_CALLBACK'
            }
        });
    };

    return svc;
});