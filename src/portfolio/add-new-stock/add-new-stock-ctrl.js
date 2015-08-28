AddNewStock.controller('AddNewStockCtrl', function (PortfolioService, StocksService) {
    var ctrl = this;

    ctrl.getStocks = StocksService.getStocks;

    ctrl.addStock = function (stock) {
        PortfolioService.addStock(stock);
        ctrl.close();
    };

    ctrl.close = function () {
        ctrl.isOpen = false;
        ctrl.newStock = null;
    };

    ctrl.isNegative = function (string) {
        return string.toString().charAt(0) === '-';
    };

    ctrl.getChangePercentageColor = function (change) {
        if (!change) {
            return;
        }

        return (ctrl.isNegative(change)) ? 'red' : 'green';
    }
});