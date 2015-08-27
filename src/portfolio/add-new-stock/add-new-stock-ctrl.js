AddNewStock.controller('AddNewStockCtrl', function (PlayerService, StocksService) {
    var ctrl = this;

    ctrl.getStocks = StocksService.getStocks;

    ctrl.addStock = function (stock) {
        if (stock) {
            PlayerService.addStock(stock);
        }
        ctrl.close();
    };

    ctrl.close = function () {
        ctrl.isOpen = false;
        ctrl.newStock = null;
    };

    ctrl.isNegative = function (string) {
        return string.charAt(0) === '-';
    };

    ctrl.getChangePercentageColor = function (change) {
        if (!change) {
            return;
        }

        return (ctrl.isNegative(change)) ? 'red' : 'green';
    }
});