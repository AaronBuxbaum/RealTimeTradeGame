RealTimeTrade.controller('MainCtrl', function (LeagueService) {
    var ctrl = this;
	
	ctrl.leagueName = 'Example League';
	ctrl.players = LeagueService.examplePlayers;
});