Stocks.factory('StocksService', function ($http, $q) {
    var svc = this;

    svc.getStocks = function (query) {
        return $http({
            method: 'JSONP',
            url: '//dev.markitondemand.com/Api/v2/Lookup/jsonp',
            params: {
                input: query,
                callback: 'JSON_CALLBACK'
            }
        }).then(function (response) {
            var suggestedStocks = response.data;

            if (suggestedStocks.length) {
                svc.getSymbolValues(_.pluck(suggestedStocks, 'Symbol')).then(function (symbolValues) {
                    symbolValues = symbolValues.data;
                    _.times(symbolValues.length, function (index) {
                        if (symbolValues[index]) {
                            suggestedStocks[index].value = symbolValues[index].l;
                            suggestedStocks[index].changePercentage = symbolValues[index].cp;
                        }
                    });
                });
            }

            console.log(suggestedStocks);
            return suggestedStocks
        });
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