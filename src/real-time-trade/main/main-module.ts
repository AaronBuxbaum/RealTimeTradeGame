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
            });

        var tabs = ['ticker', 'portfolio', 'logOut'];

        _.forEach(tabs, function (state, i) {
            $stateProvider.state('tabs.' + state, {
                url: '/' + state,
                data: {
                    selectedTab: i
                }
            });
        });
    });