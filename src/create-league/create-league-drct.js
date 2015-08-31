CreateLeague.directive('createLeague', function () {
	return {
		restrict: 'E',
		templateUrl: 'create-league/create-league.html',
		controller: 'CreateLeagueCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});