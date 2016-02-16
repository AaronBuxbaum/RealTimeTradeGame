/**
* @ngdoc directive
* @name RealTimeTrade.Main.directive:main
* @restrict E
* @element main
* @scope
*
* @description
* The main directive.
**/
angular.module('RealTimeTrade.Main').directive('main', function () {
    return {
        restrict: 'E',
        templateUrl: 'real-time-trade/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl',
        bindToController: true,
        scope: {},
        link: function (scope, elem, attrs, ctrl: {selectedTab: string}) {
            scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                ctrl.selectedTab = toState.data.selectedTab;
            });
        }
    };
});