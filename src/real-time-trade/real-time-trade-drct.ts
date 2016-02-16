/**
* @ngdoc directive
* @name RealTimeTrade.directive:realTimeTrade
* @restrict E
* @element realTimeTrade
* @scope
*
* @description
* Wrapper directive around the main directive and loading/login modals.
**/
angular.module('RealTimeTrade').directive('realTimeTrade', function () {
	return {
		restrict: 'E',
		templateUrl: 'real-time-trade/real-time-trade.html',
		controller: 'RealTimeTradeCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});