/**
* @ngdoc controller
* @name StockSlider.controller:StockSliderCtrl
*
* @description
*
* @requires PortfolioService
**/
angular.module('StockSlider').controller('StockSliderCtrl', function (PortfolioService) {
    var ctrl = this;
    
    ctrl.getMax = PortfolioService.getUnusedPercentage;
});