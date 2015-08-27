AddNewStock.controller('AddNewStockCtrl', function ($q, $http, PlayerService, StocksService) {
    var ctrl = this;

    ctrl.getStocks = StocksService.getStocks;

    ctrl.addStock = function (stock) {
        PlayerService.addStock(stock);
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