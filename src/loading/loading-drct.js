Loading.directive('loading', function () {
	return {
		restrict: 'E',
		templateUrl: 'loading/loading.html',
		controller: 'LoadingCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});