/**
* @ngdoc overview
* @name Ticker
*
* @description
* The Ticker module.
*
* @requires ngMaterial
* @requires angularMoment
* @requires Authentication
**/
angular.module('Ticker', [
  'ngMaterial',
  'angularMoment',
  'Authentication'
])
  .config(function () {
    //Set global timezone to EST
    Highcharts.setOptions({
      global: {
        timezoneOffset: 5 * 60
      }
    });
  });