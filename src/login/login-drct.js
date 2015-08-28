Login.directive('login', function () {
	return {
		restrict: 'E',
		templateUrl: 'login/login.html',
		controller: 'LoginCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});