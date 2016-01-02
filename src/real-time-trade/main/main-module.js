/**
* @ngdoc overview
* @name RealTimeTrade.Main
*
* @description
* The Main module.
*
* @requires ngMaterial
* @requires RealTimeTrade.Ticker
* @requires RealTimeTrade.Portfolio
* @requires RealTimeTrade.Logout
**/
angular.module('RealTimeTrade.Main', [
	'ngMaterial',
	'RealTimeTrade.Ticker',
	'RealTimeTrade.Portfolio',
	'RealTimeTrade.Logout'
]);