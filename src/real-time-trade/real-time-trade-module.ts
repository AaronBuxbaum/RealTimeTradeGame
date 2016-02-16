/**
* @ngdoc overview
* @name RealTimeTrade
*
* @description
* The RealTimeTrade module.
*
* @requires ngMaterial
* @requires RealTimeTrade.Login
* @requires RealTimeTrade.Loading
* @requires RealTimeTrade.Main
* @requires RealTimeTrade.About
* @requires RealTimeTrade.Authentication
* @requires RealTimeTrade.Templates
**/
angular.module('RealTimeTrade', [
	'ngMaterial',
	'RealTimeTrade.Login',
	'RealTimeTrade.Loading',
	'RealTimeTrade.Main',
	'RealTimeTrade.About',
	'RealTimeTrade.Authentication',
	'RealTimeTrade.Templates'
]);