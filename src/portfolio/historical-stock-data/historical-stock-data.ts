/**
* @ngdoc directive
* @name RealTimeTrade.component:historicalStockData
* @element historical-stock-data
* @scope
*
* @description
**/
angular.module('RealTimeTrade').component('historicalStockData', {
  controller: 'HistoricalStockDataCtrl',
  bindings: {
    symbol: '@'
  }
});