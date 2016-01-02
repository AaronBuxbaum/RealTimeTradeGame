svc.getStocks = function (query) {
    return $http({
        method: 'GET',
        url: '//api.investfly.com/stockmarket/company',
        params: {
            exp: query,
            market: 'US',
            realtime: true
        }
    }).then(transformStocks);
};

function transformStocks(response) {
    var suggestedStocks = _.take(response.data, 5);
    if (suggestedStocks.length) {
        svc.getTickerValues(_.pluck(suggestedStocks, 'ticker')).then(function (tickerValues) {
            tickerValues = tickerValues.data;
            _.times(tickerValues.length, function (index) {
                if (tickerValues[index]) {
                    suggestedStocks[index].value = Number(tickerValues[index].l);
                    suggestedStocks[index].changePercentage = Number(tickerValues[index].cp);
                }
            });
            _.remove(suggestedStocks, function (stock) {
                return !stock.value;
            });
        });
    }
    return suggestedStocks;
}
      
//Get ticker values given an array of tickers
//TODO: reuse the code in server.js
svc.getTickerValues = function (tickers) {
    return $http({
        method: 'JSONP',
        url: '//finance.google.com/finance/info',
        params: {
            q: tickers.join(','),
            callback: 'JSON_CALLBACK'
        }
    });
};