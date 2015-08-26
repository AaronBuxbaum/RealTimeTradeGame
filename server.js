//Dependencies
var express = require('express');
var server = express();
var Q = require('q');
var http = require('q-io/http');
var Firebase = require("firebase");
var _ = require('lodash');

//Initialize variables
var portfolioUpdater;
var FETCH_INTERVAL = 20000;
var examplePlayerDB = new Firebase("https://realtimetrade.firebaseio.com/examplePlayer");

//Start the portfolio updater
function startPortfolioUpdater() {
	portfolioUpdater = setInterval(updatePortfolio, FETCH_INTERVAL);
}

//Update player's portfolio
function updatePortfolio() {
	examplePlayerDB.once('value', function (data) {
		var player = data.val();

		if (!player) { return; }
		
		//Param must exist for getStockValues to return correctly, so if empty, I use SPY and throw it away
		var symbols = (player.portfolio && player.portfolio.length > 0) ? _.pluck(player.portfolio, 'symbol') : ['SPY'];
		
		//Push the new earnings to the database
		getStockPrices(symbols).then(function (stockValues) {
			var previousEarnings = _.last(_.last(player.data));
			var portfolioValue = getPortfolioValue(player.portfolio, previousEarnings, stockValues);
			examplePlayerDB.child('data').push([Date.now(), portfolioValue]);
		});
	});
}

//Stop the portfolio updater
function stopPortfolioUpdater() {
	clearInterval(portfolioUpdater);
}

//Take a buffer and parse out an array of latest stock values
function transformStockPrices(body) {
	body = body.toString('utf8');
	return (body) ? _.pluck(JSON.parse(body.substring(3)), 'l_cur') : null;
}

//Get prices for an array of stock symbols
function getStockPrices(symbols) {
	return http.request({
		method: 'GET',
		host: 'www.google.com',
		path: '/finance/info?q=' + symbols,
	}).then(function (response) {
		return response.body.read().then(function (body) {
			return transformStockPrices(body);
		});
	});
}

//Return the value of the player's portfolio
function getPortfolioValue(portfolio, previousEarnings, stockValues) {
	//If this is the first entry, initialize to $1M
	if (!previousEarnings) {
		previousEarnings = 1000000;
	}
			
	//Find how much is held in currency
	var unusedPercentage = 100 - _.sum(portfolio, 'percentage');
	var total = previousEarnings * (unusedPercentage / 100);

	//Find new earnings
	if (unusedPercentage < 100) {
		total += _.reduce(stockValues, function (total, stockValue, i) {
			if (!portfolio[i].shares) {
				portfolio[i].shares = getNumberOfShares(previousEarnings, portfolio[i].percentage, stockValue);
			}

			return total + Number(stockValue) * portfolio[i].shares;
		}, 0);
	}
	
	//Update share counts
	_.times(portfolio.length, function (i) {
		portfolio[i].shares = getNumberOfShares(previousEarnings, portfolio[i].percentage, stockValues[i]);
	});

	return roundNumber(total);
}

//Find the number of shares given the total money, percentage allocated to this specific stock, and the value of a share
function getNumberOfShares(total, percentage, stockValue) {
	return total * (percentage / 100) / stockValue;
}

//Round to 2 decimal places to avoid Javascript numeric bugs (ie. 1000.00000001)
function roundNumber(num) {
	return Math.round(Number(num) * 100) / 100;
}

//Open a port and serve pages through it
function listen(port) {
	server.use(express.static(__dirname));
	server.listen(port);
	console.log("Server listening on port", port);
}

//Start the server
startPortfolioUpdater();
listen(process.env.PORT || 8080);