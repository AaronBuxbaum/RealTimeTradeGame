Loading.directive('loading', function ($mdDialog) {
	return {
		restrict: 'E',
		controller: 'LoadingCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {},
		link: function (scope) {
			scope.$on('$destroy', function () {
				$mdDialog.hide();
			});
		}
	};
});