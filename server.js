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
var FETCH_INTERVAL = 15000;
var PlayerDatabase = new Firebase('https://realtimetrade.firebaseio.com/examplePlayer');
var PortfolioDatabase = PlayerDatabase.child('portfolio');
var HistoryDatabase = PlayerDatabase.child('data');

//Start the portfolio updater
function startPortfolioUpdater() {
	if (portfolioUpdater) {
		return;
	}
	console.log('starting');
	portfolioUpdater = setInterval(updatePortfolio, FETCH_INTERVAL);
}

//Stop the portfolio updater
function stopPortfolioUpdater() {
	if (!portfolioUpdater) {
		return;
	}

	console.log('stopping');
	clearInterval(portfolioUpdater);
	portfolioUpdater = null;
}

//Update player's portfolio
function updatePortfolio() {
	PortfolioDatabase.once('value', function (portfolioData) {
		if (!portfolioData) { return; }
		
		//Push the new earnings to the database
		HistoryDatabase.once('value', function (history) {
			var portfolio = portfolioData.val();
			var previousEarnings = _.last(_.last(_.toArray(history.val())));

			getPortfolioValue(portfolio, previousEarnings).then(function (portfolioValue) {
				HistoryDatabase.push([Date.now(), portfolioValue]);
			});
		});
	});
}

//Check the time
function checkTime() {
	if (portfolioUpdater) {
		//If NYSE has closed
		if (moment().isBetween(16, 9, 'hour')) {
			stopPortfolioUpdater();
		}
	}
	
	//If NYSE has just opened
	else {
		startPortfolioUpdater();
	}
}



/* Portfolio value functions */

//Return the value of the player's portfolio
function getPortfolioValue(portfolio, previousEarnings) {
	//If this is the first entry, initialize to $1M
	if (!previousEarnings) {
		previousEarnings = 1000000;
	}

	//Initialize cash
	var unusedPercentage = 100 - _.sum(portfolio, 'percentage');
	var total = previousEarnings * (unusedPercentage / 100);

	//Find new earnings
	var tickers = _.pluck(_.toArray(portfolio), 'ticker');
	return getStockPrices(tickers).then(function (stockValues) {
		var stockValuesMap = _.zipObject(tickers, stockValues);

		_.forOwn(portfolio, function (stock, key) {
			var stockValue = Number(stockValuesMap[stock.symbol]);
			stock.shares = previousEarnings * (stock.percentage / 100) / stock.value;
			stock.value = stockValue;
			total += stockValue * stock.shares;
		});
			
		//Update stock values
		PortfolioDatabase.set(portfolio);

		return roundNumber(total);
	});
}

//Get prices for an array of stock symbols
function getStockPrices(tickers) {
	//Param must exist for getStockValues to return correctly, so if empty, I use SPY and throw it away
	if (!tickers || !tickers.length) {
		tickers = ['SPY']
	}

	return http.request({
		method: 'GET',
		host: 'www.google.com',
		path: '/finance/info?q=' + tickers.join(',')
	}).then(function (response) {
		return response.body.read().then(function (body) {
			return transformStockPrices(body);
		});
	});
}

//Take a buffer and parse out an array of latest stock values
function transformStockPrices(body) {
	body = body.toString('utf8');
	return (body) ? _.pluck(JSON.parse(body.substring(3)), 'l') : null;
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
checkTime();
setInterval(checkTime, FETCH_INTERVAL * 10);