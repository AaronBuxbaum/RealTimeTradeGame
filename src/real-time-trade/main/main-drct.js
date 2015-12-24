/**
* @ngdoc directive
* @name Main.directive:main
* @restrict E
* @element main
* @scope
*
* @description
* The main directive.
**/
angular.module('Main').directive('main', function () {
	return {
		restrict: 'E',
		templateUrl: 'real-time-trade/main/main.html',
		controller: 'MainCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});