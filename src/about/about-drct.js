About.directive('about', function () {
	return {
		restrict: 'E',
		templateUrl: 'about/about.html',
		controller: 'AboutCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});