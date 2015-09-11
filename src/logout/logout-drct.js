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