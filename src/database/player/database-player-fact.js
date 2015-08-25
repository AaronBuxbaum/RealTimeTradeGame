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
	//Assumes stocks are an array of objects that have attributes of symbol (String) and percentage (Number)
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
        }).then(function (response) {
			var total = 0;

			_.forEach(response.data, function (val, index) {
				total += val.l * (player.stocks[index].percentage / 100);
			});

			//TODO: working on this logic here
			//perhaps give a 'cash' attribute or something?
			//var previousValue = _.last(_.last(svc.examplePlayer.data));
			
			player.data.push([Date.now(), total]);
		});
	};

	return svc;
});