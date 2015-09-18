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

    ctrl.update = function (auth) {
        ctrl.portfolio = (auth) ? PortfolioService.getPortfolio(auth.uid) : null;
        ctrl.updateStock = PortfolioService.saveStock;
        ctrl.deleteStock = PortfolioService.deleteStock;
        ctrl.getMax = PortfolioService.getUnusedPercentage;
    };

    ctrl.authAndUpdate = function () {
        var uid = AuthenticationService.getUserID();
        ctrl.update(uid);
    };

    AuthenticationService.auth.$onAuth(ctrl.update);
});