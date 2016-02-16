/**
* @ngdoc controller
* @name RealTimeTrade.Portfolio.controller:PortfolioCtrl
*
* @description
*
* @requires AuthenticationService
* @requires PortfolioService
**/
angular.module('RealTimeTrade.Portfolio').controller('PortfolioCtrl', function (AuthenticationService, PortfolioService) {
    var ctrl = this;

    //Get portfolio
    var uid = AuthenticationService.getUserID();
    ctrl.portfolio = PortfolioService.getPortfolio(uid);

    //Get stock updating functions when the portfolio is ready
    ctrl.portfolio.$loaded(function () {
        ctrl.isLoaded = true;
        ctrl.updateStock = PortfolioService.saveStock;
        ctrl.deleteStock = PortfolioService.deleteStock;
        ctrl.getMax = PortfolioService.getUnusedPercentage;
    });
});