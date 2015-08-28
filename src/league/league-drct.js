League.directive('league', function () {
	return {
		restrict: 'E',
		templateUrl: 'league/league.html',
		controller: 'LeagueCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});