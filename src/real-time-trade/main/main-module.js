/**
* @ngdoc overview
* @name RealTimeTrade.Main
*
* @description
* The Main module.
*
* @requires ui.router
* @requires ngMaterial
* @requires RealTimeTrade.Ticker
* @requires RealTimeTrade.Portfolio
* @requires RealTimeTrade.Logout
**/
angular.module('RealTimeTrade.Main', [
    'ui.router',
    'ngMaterial',
    'RealTimeTrade.Ticker',
    'RealTimeTrade.Portfolio',
    'RealTimeTrade.Logout'
])

    .config(function ($stateProvider) {
        $stateProvider
            .state('tabs', {
                abstract: true,
                url: '/tabs'
            })
            .state('tabs.ticker', {
                url: '/ticker',
                data: {
                    'selectedTab': 0
                }
            })
            .state('tabs.portfolio', {
                url: '/portfolio',
                data: {
                    'selectedTab': 1
                }
            })
            .state('tabs.logOut', {
                url: '/logout',
                data: {
                    'selectedTab': 2
                }
            });
    });