var express = require('express');
var server = express();
var http = require('http');
var _ = require('./bower_components/lodash/lodash.js');

//TODO: remove and replace with database
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

var FETCH_INTERVAL = 5000;
function startPortfolioUpdater() {
	setInterval(function () {
		_.forEach(examplePlayers, function (player) {
			//Param must exist for getStockValues to return correctly, so if empty, I use SPY and throw it away
			var symbols = _.pluck(player.portfolio, 'symbol') || 'SPY';

			getStockValues(symbols).on('data', function (stockValues) {
				updatePortfolio(player, stockValues);
			});
		}, FETCH_INTERVAL);
	});
};

//Taken from https://github.com/nodesocket/quote-stream/blob/master/server.js
function getStockValues(tickers) {
	return http.get({
		host: 'www.google.com',
		port: 80,
		path: '/finance/info?client=ig&q=' + tickers
	}, function (response) {
		response.setEncoding('utf8');
		var data = ''; //TODO: can this be replaced with a stringbuffer?

		response.on('data', function (chunk) {
			data += chunk;
		});

		response.on('end', function () {
			if (data.length > 0) {
				try {
					var data_object = JSON.parse(data.substring(3));
				} catch (e) {
					return;
				}

				/*
				var quote = {};
				quote.ticker = data_object[0].t;
				quote.exchange = data_object[0].e;
				quote.price = data_object[0].l_cur;
				quote.change = data_object[0].c;
				quote.change_percent = data_object[0].cp;
				quote.last_trade_time = data_object[0].lt;
				quote.dividend = data_object[0].div;
				quote.yield = data_object[0].yld;
				console.log(quote);
				*/

				return _.pluck(data_object, 'l_cur');
				
				//p_socket.emit('quote', PRETTY_PRINT_JSON ? JSON.stringify(quote, true, '\t') : JSON.stringify(quote));
			}
		});
	});
}

function updatePortfolio(player, stockValues) {
	//Get last tick's earnings or initialize to $1M
	var lastTick = _.last(_.last(player.data)) || 1000000;
			
	//Update shares
	_.forEach(player.portfolio, function (stock, index) {
		stock.shares = (lastTick * (stock.percentage / 100)) / stockValues[index];
	});
			
	//Find how much is held in currency
	var unusedPercentage = 100 - _.sum(player.portfolio, 'percentage');
	var total = lastTick * (unusedPercentage / 100);

	//Find new earnings
	if (player.portfolio.length > 0) {
		total += _.reduce(stockValues, function (total, stockValue, index) {
			return total + stockValue * player.portfolio[index].shares;
		}, 0);
	}
		
	//Round to 2 decimal places to avoid Javascript numeric bugs (ie. 1000.00000001)
	total = Math.round(total * 100) / 100;

	//Save to database
	//TODO: move this to a database
	player.data.push([Date.now(), total]);
};

function listen(port) {
	server.use(express.static(__dirname));
	server.listen(port);
	console.log("Server listening on port", port);
}

listen(8080);
startPortfolioUpdater();