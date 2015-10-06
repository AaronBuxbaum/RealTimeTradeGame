/**
* @ngdoc controller
* @name Portfolio.controller:PortfolioCtrl
*
* @description
*
* @requires AuthenticationService
* @requires PortfolioService
**/
angular.module('Portfolio').controller('PortfolioCtrl', function (AuthenticationService, PortfolioService) {
    var ctrl = this;

    ctrl.update = function () {
        var uid = AuthenticationService.getUserID();
        ctrl.portfolio = PortfolioService.getPortfolio(uid);
        ctrl.updateStock = PortfolioService.saveStock;
        ctrl.deleteStock = PortfolioService.deleteStock;
        ctrl.getMax = PortfolioService.getUnusedPercentage;
    };
    ctrl.update();
});