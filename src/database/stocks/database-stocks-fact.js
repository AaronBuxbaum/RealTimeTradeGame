Stocks.factory('StocksService', function ($http, $q) {
    var svc = this;

    svc.getStocks = function (query) {
        return $http({
            method: 'GET',
            url: '//api.investfly.com/stockmarket/company',
            params: {
                exp: query,
                market: 'US'
            }
        }).then(transformStocks);
    };

    function transformStocks(response) {
        var suggestedStocks = _.take(response.data, 10);
        if (suggestedStocks.length) {
            svc.getSymbolValues(_.pluck(suggestedStocks, 'ticker')).then(function (symbolValues) {
                symbolValues = symbolValues.data;
                _.times(symbolValues.length, function (index) {
                    if (symbolValues[index]) {
                        suggestedStocks[index].value = Number(symbolValues[index].l);
                        suggestedStocks[index].changePercentage = Number(symbolValues[index].cp);
                    }
                });
            });
        }
        return suggestedStocks;
    }

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