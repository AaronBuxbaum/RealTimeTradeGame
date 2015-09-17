/**
* @ngdoc directive
* @name About.directive:about
* @restrict E
* @element about
* @scope
* 
* @description
* A button that opens a dialog with developer information.
**/
angular.module('About').directive('about', function () {
	return {
		restrict: 'E',
		templateUrl: 'about/about.html',
		controller: 'AboutCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});