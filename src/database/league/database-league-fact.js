League.factory('LeagueService', function (DatabaseService) {
	var svc = this;
	
	//Initialize players array
	svc.examplePlayers = [];

	//Add a new player
	svc.createPlayer = function (name) {
		var lastId = (svc.examplePlayers && svc.examplePlayers.length > 0) ? _.last(svc.examplePlayers).id : 1;

		DatabaseService.getSyncObject().$save({
			id: lastId,
			name: name,
			portfolio: [], //TODO: use a set instead to ensure unique elements in O(1)
			data: []
		});
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