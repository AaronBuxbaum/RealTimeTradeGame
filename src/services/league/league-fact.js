League.factory('LeagueService', function (DatabaseService) {
	var svc = this;

	//Add a new player
	svc.createPlayer = function (name) {
		//var lastId = (svc.getPlayer() && svc.getPlayer().length > 0) ? _.last(svc.getPlayer()).id : 1;
		var newPlayer = svc.getPlayer();
		newPlayer.id = 1;
		newPlayer.name = name;
		newPlayer.portfolio = []; //TODO: use a set instead to ensure unique elements in O(1)
		newPlayer.data = [];
		return newPlayer.$save();
	};
	
	//Get a player given their unique ID
	svc.getPlayer = function (id) {
		return DatabaseService.getSyncObject();
		//return _.find(svc.examplePlayers, { id: id });
	};
		
	/* For testing... */
	svc.createPlayer('Aaron');

	return svc;
});