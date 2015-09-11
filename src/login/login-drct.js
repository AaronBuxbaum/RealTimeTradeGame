angular.module('Login').directive('login', function ($mdDialog) {
	return {
		restrict: 'E',
		controller: 'LoginCtrl',
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