/**
* @ngdoc directive
* @name Loading.directive:loading
* @restrict E
* @element loading
* @scope
*
* @description
* A loading spinner in an Angular-Material modal.
**/
angular.module('Loading').directive('loading', function ($mdDialog) {
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