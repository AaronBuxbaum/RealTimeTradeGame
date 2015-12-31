/**
* @ngdoc directive
* @name CreateLeague.directive:createLeague
* @restrict E
* @element createLeague
* @scope
*
* @description
* A form to create a new league.
**/
angular.module('CreateLeague').directive('createLeague', function () {
	return {
		restrict: 'E',
		templateUrl: 'create-league/create-league.html',
		controller: 'CreateLeagueCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});