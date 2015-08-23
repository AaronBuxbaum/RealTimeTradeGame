StockAddNew.controller('StockAddNewCtrl', function ($q, $http, DatabaseService) {
    var ctrl = this;

    ctrl.addStock = function (stock) {
        if (stock) {
            DatabaseService.exampleAddStock(stock);
            ctrl.newStock = null;
        }
    };

    ctrl.getStocks = function (query) {
        var deferred = $q.defer();

        //TODO: find a better way to do this that's less hacky
        //Hacky way to convince browser that the yahoo framework is installed.
        //Pollutes the global scope slightly, but shouldn't be a big deal, mostly.
        //In addition, this approach calls the function for every update; should be debounced.
        window.YAHOO = {
            Finance: {
                SymbolSuggest: {
                    ssCallback: function (data) {
                        deferred.resolve(data.ResultSet.Result);
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
        }).then(YAHOO.Finance.SymbolSuggest.ssCallback);

        return deferred.promise;
    };
});