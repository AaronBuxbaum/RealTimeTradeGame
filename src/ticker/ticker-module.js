angular.module('Ticker', [
	'ngMaterial',
	'highcharts-ng',
	'angularMoment',
	'Authentication'
])
	.config(function () {
		//Set the underlying Highcharts options that are currently unsupported by the Angular directive
		Highcharts.setOptions({
			global: {
				useUTC: false
			}
		});
	});