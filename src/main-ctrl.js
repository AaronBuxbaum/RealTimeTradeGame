RealTimeTrade.controller('MainCtrl', function (DatabaseService) {
    var ctrl = this;
	
	ctrl.leagueName = 'Example League';
	ctrl.players = DatabaseService.examplePlayers;
});