Main.directive('main', function () {
	return {
		restrict: 'E',
		templateUrl: 'main/main.html',
		controller: 'MainCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});