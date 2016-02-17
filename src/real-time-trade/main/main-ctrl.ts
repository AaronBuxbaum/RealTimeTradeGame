/**
* @ngdoc controller
* @name RealTimeTrade.Main.controller:MainCtrl
*
* @description
**/
angular.module('RealTimeTrade.Main').controller('MainCtrl', function ($scope) {
  var ctrl = this;
  
  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    ctrl.selectedTab = toState.data.selectedTab;
  });
});