/**
* @ngdoc overview
* @name RealTimeTrade.Portfolio
*
* @description
* The Portfolio module.
*
* @requires firebase
* @requires ngAnimate
* @requires ngMaterial
* @requires ngMdIcons
* @requires RealTimeTrade.Authentication
* @requires RealTimeTrade.AddNewStock
* @requires RealTimeTrade.StockSlider
**/
angular.module('RealTimeTrade.Portfolio', [
    'firebase',
    'ngAnimate',
    'ngMaterial',
    'ngMdIcons',
    'RealTimeTrade.Authentication',
    'RealTimeTrade.AddNewStock',
    'RealTimeTrade.StockSlider'
]);