/**
* @ngdoc overview
* @name Portfolio
*
* @description
* The Portfolio module.
*
* @requires firebase
* @requires ngAnimate
* @requires ngMaterial
* @requires ngMdIcons
* @requires AddNewStock
* @requires StockSlider
**/
angular.module('Portfolio', [
    'firebase',
    'ngAnimate',
    'ngMaterial',
    'ngMdIcons',
    'Authentication',
    'AddNewStock',
    'StockSlider'
]);