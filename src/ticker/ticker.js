/* global Ticker */
var Ticker = angular.module('Ticker', ['highcharts-ng', 'Player']);

Ticker.config(function () {
	//Set the underlying Highcharts options that are currently unsupported by the Angular directive
	Highcharts.setOptions({
        global: {
			useUTC: false
        }
	});
});