//Dependencies
var express = require('express');
var server = express();
var Q = require('q');
var http = require('q-io/http');
var Firebase = require('firebase');
var moment = require('moment');
var _ = require('lodash');

//Initialize variables
var portfolioUpdater;
var active = false;
var FETCH_INTERVAL = 5000;
var PlayerDatabase = new Firebase('https://realtimetrade.firebaseio.com/examplePlayer');
var PortfolioDatabase = PlayerDatabase.child('portfolio');

//Start the portfolio updater
function startPortfolioUpdater() {
	portfolioUpdater = setInterval(updatePortfolio, FETCH_INTERVAL);
	active = true;
}

//Stop the portfolio updater
function stopPortfolioUpdater() {
	clearInterval(portfolioUpdater);
	active = false;
}

//Update player's portfolio
function updatePortfolio() {
	PortfolioDatabase.once('value', function (portfolioData) {
		if (!portfolioData) { return; }
		
		//Param must exist for getStockValues to return correctly, so if empty, I use SPY and throw it away
		var portfolio = portfolioData.val();
		var portfolioArray = _.toArray(portfolio);
		var symbols = (portfolioArray && portfolioArray.length > 0) ? _.pluck(portfolioArray, 'symbol') : ['SPY'];
		
		//Push the new earnings to the database
		var HistoryDatabase = PlayerDatabase.child('data');
		HistoryDatabase.once('value', function (history) {
			var previousEarnings = _.last(_.last(_.toArray(history.val())));
			getPortfolioValue(portfolio, previousEarnings, symbols).then(function (portfolioValue) {
				HistoryDatabase.push([Date.now(), portfolioValue]);
			});
		});
	});
}

//Check the time
function checkTime() {
	//If NYSE has closed
	if (moment().isBetween(17, 9, 'hour')) {
		stopPortfolioUpdater();
	}
	//If NYSE has just opened
	else if (!active) {
		startPortfolioUpdater();
	}
}



/* Portfolio value functions */

//Return the value of the player's portfolio
function getPortfolioValue(portfolio, previousEarnings, symbols) {
	//If this is the first entry, initialize to $1M
	if (!previousEarnings) {
		previousEarnings = 1000000;
	}

	//Initialize cash
	var unusedPercentage = 100 - _.sum(portfolio, 'percentage');
	var total = previousEarnings * (unusedPercentage / 100);

	//Find new earnings
	return getStockPrices(symbols).then(function (stockValues) {
		var stockValuesMap = _.zipObject(symbols, stockValues);

		_.forOwn(portfolio, function (stock, key) {
			var stockValue = Number(stockValuesMap[stock.symbol]);
			stock.shares = previousEarnings * (stock.percentage / 100) / stock.value;
			stock.value = stockValue;
			total += stock.value * stock.shares;
		});
			
		//Update stock values
		PortfolioDatabase.set(portfolio);

		return roundNumber(total);
	});
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

//Take a buffer and parse out an array of latest stock values
function transformStockPrices(body) {
	body = body.toString('utf8');
	return (body) ? _.pluck(JSON.parse(body.substring(3)), 'l_cur') : null;
}

//Round to 2 decimal places to avoid Javascript numeric bugs (ie. 1000.00000001)
function roundNumber(num) {
	return Math.round(Number(num) * 100) / 100;
}



/* Server functions */

//Open a port and serve pages through it
function listen(port) {
	server.use(express.static(__dirname));
	server.all('/*', function (request, response) {
		return response.redirect('/src/');
	});
	server.listen(port);
	console.log("Server listening on port", port);
}



/* Initialization */
//Start the server
listen(process.env.PORT || 8080);
startPortfolioUpdater();
setInterval(checkTime, FETCH_INTERVAL * 10);