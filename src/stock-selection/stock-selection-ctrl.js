StockSelection.controller('StockSelectionCtrl', function (DatabaseService) {
    var ctrl = this;

    ctrl.stocks = DatabaseService.exampleStocks;

    ctrl.USD = {
        name: 'U.S. Dollar',
        symbol: 'USD',
        percentage: 0
    };

    ctrl.deleteStock = function (stock) {
        DatabaseService.exampleDeleteStock(stock);
    };

    ctrl.calculateTotal = function () {
        return _.reduce(ctrl.stocks, function (total, value, key) {
            return total + value.percentage;
        }, 0);
    };

    ctrl.totalPercentage = function (stock) {
        return 100 - ctrl.calculateTotal() + stock.percentage;
    };
});