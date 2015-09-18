/**
* @ngdoc directive
* @name Ticker.directive:ticker
* @restrict E
* @element ticker
* @scope
*
* @description
**/
angular.module('Ticker').directive('ticker', function () {
	return {
		restrict: 'E',
		templateUrl: 'ticker/ticker.html',
		controller: 'TickerCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});