/**
* @ngdoc controller
* @name RealTimeTrade.Portfolio.controller:HistoricalStockDataCtrl
*
* @description
*
* @requires ChartService
**/
angular.module('RealTimeTrade.Portfolio').controller('HistoricalStockDataCtrl', function (ChartService) {
    var ctrl = this;

    if (_.isString(ctrl.symbol) && ctrl.symbol.length && ctrl.symbol.length < 5) {
        ChartService.getHistoricalStockValues(ctrl.symbol)
            .then(function (chartData) {
                ctrl.chart.addSeries({data: chartData});
            })
            .finally(function() {
                ctrl.chart.hideLoading(); 
                ctrl.chart.reflow();
            });
    }
});