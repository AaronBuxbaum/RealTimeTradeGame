/**
* @ngdoc directive
* @name RealTimeTrade.Login.directive:login
* @restrict E
* @element login
* @scope
*
* @description
* A username/password login form in an Angular-Material modal.
**/
angular.module('RealTimeTrade.Login').directive('login', function ($mdDialog) {
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