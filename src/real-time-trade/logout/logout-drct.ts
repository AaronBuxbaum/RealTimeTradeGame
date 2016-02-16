/**
* @ngdoc directive
* @name RealTimeTrade.Logout.directive:logout
* @restrict E
* @element logout
* @scope
*
* @description
* A logout button that deauthorizes the user.
**/
angular.module('RealTimeTrade.Logout').directive('logout', function () {
	return {
		restrict: 'E',
		templateUrl: 'real-time-trade/logout/logout.html',
		controller: 'LogoutCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});