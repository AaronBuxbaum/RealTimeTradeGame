/**
* @ngdoc overview
* @name Ticker
*
* @description
* The Ticker module.
*
* @requires ngMaterial
* @requires highcharts-ng
* @requires angularMoment
* @requires Authentication
**/
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