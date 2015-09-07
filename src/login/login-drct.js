Login.directive('login', function ($mdDialog) {
	return {
		restrict: 'E',
		controller: 'LoginCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {},
		compile: function () {
			return {
				pre: function (scope) {
					scope.$on('$destroy', function () {
						$mdDialog.hide();
					});
				},
				post: function (scope, elem, attrs, ctrl) {
					ctrl.showDialog();
				}
			}
		}
	};
});