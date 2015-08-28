Toolbar.directive('toolbar', function () {
	return {
		restrict: 'E',
		templateUrl: 'toolbar/toolbar.html',
		controller: 'ToolbarCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});