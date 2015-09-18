/**
* @ngdoc overview
* @name Main
*
* @description
* The Main module.
*
* @requires ngMaterial
* @requires Ticker
* @requires Portfolio
* @requires CreateLeague
* @requires League
* @requires Logout
**/
angular.module('Main', [
	'ngMaterial',
	'Ticker',
	'Portfolio',
	'CreateLeague',
	'League',
	'Logout'
]);