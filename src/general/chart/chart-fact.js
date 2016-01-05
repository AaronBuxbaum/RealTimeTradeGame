
angular.module('RealTimeTrade.Chart').factory('ChartService', function ($http) {
    var svc = this;

    //Get historical stock values
    svc.getHistoricalStockValues = function (symbol) {
        if (!_.isString(symbol)) { return; }

        return $http({
            method: 'GET',
            url: '//www.quandl.com/api/v3/datasets/WIKI/' + symbol + '.json',
            cache: true,
            params: {
                limit: 200,
                column_index: 1,
                auth_token: '_LR44m9zxP7wE6D4vkMD'
            }
        }).then(function (response) {
            var data = response.data.dataset.data;
            return _.map(data, function (item) {
                return item[1];
            });
        });
    };

    return svc;
});