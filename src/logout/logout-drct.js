/**
* @ngdoc directive
* @name Logout.directive:logout
* @restrict E
* @element logout
* @scope
*
* @description
* A logout button that deauthorizes the user.
**/
angular.module('Logout').directive('logout', function () {
	return {
		restrict: 'E',
		templateUrl: 'logout/logout.html',
		controller: 'LogoutCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});