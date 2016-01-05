/**
* @ngdoc directive
* @name RealTimeTrade.Portfolio.directive:historicalStockData
* @restrict E
* @element historical-stock-data
* @scope
*
* @description
**/
angular.module('RealTimeTrade.Portfolio').directive('historicalStockData', function () {
    return {
        restrict: 'E',
        templateUrl: 'portfolio/historical-stock-data/historical-stock-data.html',
        controller: 'HistoricalStockDataCtrl',
        controllerAs: 'ctrl',
        bindToController: true,
        scope: {
            symbol: '@'
        }
    };
});