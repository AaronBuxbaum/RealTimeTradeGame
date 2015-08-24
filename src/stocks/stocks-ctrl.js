Stocks.controller('StocksCtrl', function (DatabaseService) {
    var ctrl = this;

    ctrl.stocks = DatabaseService.examplePlayer.stocks;
    ctrl.getValue = DatabaseService.getValueOfStocks;

    ctrl.deleteStock = function (index) {
        DatabaseService.exampleDeleteStock(index);
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