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
        },
        link: function (scope, element, attrs, ctrl) {
            var chartOptions = {
                chart: {
                    renderTo: element.find('DIV')[0],
                    style: {
                        fontFamily: [
                            'Roboto',
                            'Helvetica Neue',
                            'sans-serif'
                        ]
                    }
                },
                credits: {
                    enabled: false
                },
                navigator: false,
                rangeSelector: false,
                series: [],
                scrollbar : {
                    enabled : false
                },
                xAxis: {
                    visible: false
                },
                yAxis: {
                    visible: false
                }
            };
            ctrl.chart = new Highcharts.StockChart(chartOptions);
            ctrl.chart.showLoading();
        }
    };
});