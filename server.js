var express = require('express');
var server = express();
var _ = require('./bower_components/lodash/lodash.js');

//TODO: replace all of this example code with a real database
var examplePlayers = [
	{
		portfolio: [
			{
				symbol: 'SPY',
				percentage: 100
			}
		],
		data: []
	},
	{
		portfolio: [],
		data: []
	}
];

function tickPortfolio(portfolio) {
	var symbols = _.pluck(portfolio, 'symbol');
	return {
		data: [
			{
				l: symbols.length * Math.random() * 1000
			}
		]
	};
}

function updatePortfolios() {
	_.forEach(examplePlayers, function (player) {
		var response = tickPortfolio(player.portfolio);
		
		//Get last tick's earnings or initialize to $1M
		var lastTick = _.last(_.last(player.data)) || 1000000;
			
		//Update shares
		_.forEach(player.portfolio, function (stock, index) {
			stock.shares = (lastTick * (stock.percentage / 100)) / response.data[index].l;
		});
			
		//Find how much is held in currency
		var unusedPercentage = 100 - _.sum(player.portfolio, 'percentage');
		var total = lastTick * (unusedPercentage / 100);

		//Find new earnings
		if (player.portfolio.length > 0) {
			total += _.reduce(response.data, function (total, stockData, index) {
				return total + stockData.l * player.portfolio[index].shares;
			}, 0);
		}
		
		//Round to avoid Javascript numeric bugs (ie. 1000.00000001)
		//TODO: there's gotta be a cleaner way to do this
		total = Number(total.toPrecision(2));

		//Save to database
		player.data.push([Date.now(), total]);
	});
}

setInterval(updatePortfolios, 5000);

function listen(port) {
	server.use(express.static(__dirname));
	server.listen(port);
	console.log("Server listening on port", port);
}

updatePortfolios();
listen(8080);