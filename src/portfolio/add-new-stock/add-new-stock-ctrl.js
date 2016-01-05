/**
* @ngdoc controller
* @name RealTimeTrade.Portfolio.controller:AddNewStockCtrl
*
* @description
*
* @requires PortfolioService
* @requires AddNewStockService
**/
angular.module('RealTimeTrade.Portfolio').controller('AddNewStockCtrl', function (PortfolioService, AddNewStockService) {
    var ctrl = this;

    ctrl.getStocks = AddNewStockService.getStocks;
    ctrl.unescape = he.decode;

    ctrl.addStock = function (stock) {
        PortfolioService.addStock(stock);
        ctrl.close();
    };

    ctrl.close = function () {
        ctrl.isOpen = false;
        ctrl.newStock = null;
    };
});