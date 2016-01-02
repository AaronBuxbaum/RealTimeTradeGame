/**
* @ngdoc overview
* @name RealTimeTrade
*
* @description
* The RealTimeTrade module.
*
* @requires ngMaterial
* @requires Login
* @requires Loading
* @requires Main
* @requires About
* @requires Authentication
* @requires Templates
**/
angular.module('RealTimeTrade', [
	'ngMaterial',
	'RealTimeTrade.Login',
	'RealTimeTrade.Loading',
	'RealTimeTrade.Main',
	'RealTimeTrade.About',
	'RealTimeTrade.Authentication',
	'Templates'
]);