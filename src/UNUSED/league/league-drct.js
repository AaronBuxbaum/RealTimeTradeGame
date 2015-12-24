/**
* @ngdoc directive
* @name League.directive:league
* @restrict E
* @element league
* @scope
*
* @description
* A form to select a league.
**/
angular.module('League').directive('league', function () {
	return {
		restrict: 'E',
		templateUrl: 'league/league.html',
		controller: 'LeagueCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});