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
        controller: 'HistoricalStockDataCtrl',
        controllerAs: 'ctrl',
        bindToController: true,
        scope: {
            symbol: '@'
        },
        template: '<div></div>',
        link: function (scope, element, attrs, ctrl) {
            ctrl.chartOptions.chart.renderTo = element.find('DIV')[0];
            ctrl.chart = new Highcharts.StockChart(ctrl.chartOptions);
            ctrl.chart.showLoading();
        }
    };
});