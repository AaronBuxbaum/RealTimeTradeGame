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
	
	//Update player's portfolio
	svc.updatePortfolio = function (id) {
		var player = LeagueService.getPlayer(id);

        return $http({
            method: 'JSONP',
            url: 'http://finance.google.com/finance/info',
            params: {
                q: _.pluck(player.portfolio, 'symbol').join(',') || 'SPY', //param must exist for this to return correctly, so I use SPY and throw it away
                callback: 'JSON_CALLBACK'
            }
        })
			.then(function (response) {
				//Get last tick's earnings or initialize to $1M
				var lastTick = _.last(_.last(player.data)) || 1000000;
				
				//Update shares
				_.forEach(player.portfolio, function (stock, index) {
					stock.shares = (lastTick * (stock.percentage / 100)) / response.data[index].l;
				});
					
				//Find how much is held in currency
				var total = lastTick * (svc.getUnusedPercentage(id) / 100);

				//Find new earnings
				if (player.portfolio.length > 0) {
					total += _.reduce(response.data, function (total, stockData, index) {
						return total + stockData.l * player.portfolio[index].shares;
					}, 0);
				}

				//Save to database
				player.data.push([Date.now(), total]);
			});
	};

	return svc;
});