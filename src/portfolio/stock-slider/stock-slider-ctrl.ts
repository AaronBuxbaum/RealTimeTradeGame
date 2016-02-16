/**
* @ngdoc controller
* @name RealTimeTrade.Portfolio.controller:StockSliderCtrl
*
* @description
*
* @requires PortfolioService
**/
angular.module('RealTimeTrade.Portfolio').controller('StockSliderCtrl', function (PortfolioService) {
    var ctrl = this;
    
    ctrl.getMax = PortfolioService.getUnusedPercentage;
});