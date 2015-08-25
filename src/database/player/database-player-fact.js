Player.factory('PlayerService', function ($http, LeagueService) {
	var svc = this;
	
	//Add a stock to a player
	svc.exampleAddStock = function (id, stock) {
        stock.percentage = 0;
        LeagueService.getPlayer(id).stocks.push(stock);
	};

	//Delete a stock from a player
	svc.exampleDeleteStock = function (id, index) {
		LeagueService.getPlayer(id).stocks.splice(index, 1);
	};
	
	//Get value of stocks for a player
	svc.getValueOfStocks = function (id) {
		var player = LeagueService.getPlayer(id);
		if (!player) {
			return;
		}

        $http({
            method: 'JSONP',
            url: 'http://finance.google.com/finance/info',
            params: {
                q: _.pluck(player.stocks, 'symbol').join(','),
                callback: 'JSON_CALLBACK'
            }
        })
			.then(function (response) {
				//Step 1: get last tick's earnings
				var cash = _.last(_.last(player.data)) || 1000;
				
				//Step 2: update shares
				_.forEach(player.stocks, function (stock, index) {
					stock.shares = (cash * (stock.percentage / 100)) / response.data[index].l;
				});
				
				//Step 3: find how much is held in currency
				var USD = 100 - _.sum(player.data, 'percentage') * cash;

				//Step 4: find new earnings
				var earnings = _.reduce(response.data, function (total, stockData, index) {
					return total + stockData.l * player.stocks[index].shares;
				}, 0) + USD;

				//Step 5: save to database
				player.data.push([Date.now(), earnings]);
			});
	};

	return svc;
});