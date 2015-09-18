/**
* @ngdoc controller
* @name AddNewStock.controller:AddNewStockCtrl
*
* @description
*
* @requires PortfolioService
* @requires AddNewStockService
**/
angular.module('AddNewStock').controller('AddNewStockCtrl', function (PortfolioService, AddNewStockService) {
    var ctrl = this;

    ctrl.getStocks = AddNewStockService.getStocks;

    ctrl.addStock = function (stock) {
        PortfolioService.addStock(stock);
        ctrl.close();
    };

    ctrl.close = function () {
        ctrl.isOpen = false;
        ctrl.newStock = null;
    };
});