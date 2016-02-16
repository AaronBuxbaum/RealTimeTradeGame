/**
* @ngdoc overview
* @name RealTimeTrade.Ticker
*
* @description
* The Ticker module.
*
* @requires ngMaterial
* @requires angularMoment
* @requires RealTimeTrade.Authentication
**/
angular.module('RealTimeTrade.Ticker', [
  'ngMaterial',
  'angularMoment',
  'RealTimeTrade.Authentication'
])
  .config(function () {
    //Set global timezone to EST
    Highcharts.setOptions({
      global: {
        timezoneOffset: 5 * 60
      }
    });
  });