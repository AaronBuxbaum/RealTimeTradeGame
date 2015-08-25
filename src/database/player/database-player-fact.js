Player.factory('PlayerService', function ($http, LeagueService) {
	var svc = this;
	
	//Add a stock to a player
	svc.addStock = function (id, stock) {
        stock.percentage = 0;
        LeagueService.getPlayer(id).portfolio.push(stock);
	};

	//Delete a stock from a player
	svc.deleteStock = function (id, index) {
		LeagueService.getPlayer(id).portfolio.splice(index, 1);
	};
	
	//Find what percentage of the portfolio is unused (int between 0 and 100, inclusive).
	svc.getUnusedPercentage = function (id) {
		var player = LeagueService.getPlayer(id);
		return 100 - _.sum(player.data, 'percentage');
	};

	return svc;
});