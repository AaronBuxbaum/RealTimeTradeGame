Stocks.controller('StocksCtrl', function (LeagueService, PlayerService) {
    var ctrl = this;

    ctrl.stocks = LeagueService.getPlayer(1).stocks;
    ctrl.getValue = PlayerService.getValueOfStocks;

    ctrl.deleteStock = function (index) {
        PlayerService.exampleDeleteStock(1, index);
    };

    function calculateTotal() {
        return _.reduce(ctrl.stocks, function (total, value, key) {
            return total + value.percentage;
        }, 0);
    };

    ctrl.getMax = function (curr) {
        return 100 - calculateTotal() + curr;
    };
});