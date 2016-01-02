/**
* @ngdoc controller
* @name RealTimeTrade.StockSlider.controller:StockSliderCtrl
*
* @description
*
* @requires PortfolioService
**/
angular.module('RealTimeTrade.StockSlider').controller('StockSliderCtrl', function (PortfolioService) {
    var ctrl = this;
    
    ctrl.getMax = PortfolioService.getUnusedPercentage;
});