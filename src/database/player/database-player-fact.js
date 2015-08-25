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
	//Assumes stocks are an array of objects that have attributes of symbol (String), percentage (Number), and shares (Number)
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
				//Step 1: update shares
				var cash = _.last(_.last(player.data)) || 1000;
				_.forEach(player.stocks, function (stock) {
					stock.shares = (cash * (stock.percentage / 100)) / stock.l;
				});
		
				//Step 2: find new earnings
				//TODO:Cleaner way to iterate through two arrays at the same time?
				cash = _.reduce(response.data, function (total, stockData, index) {
					return total + stockData.l * player.stocks[index].shares;
				}, 0);

				//Step 3: save to database
				player.data.push([Date.now(), cash]);
			});
	};

	return svc;
});