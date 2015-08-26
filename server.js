//Dependencies
var express = require('express');
var server = express();
var Q = require('q');
var http = require('q-io/http');
var Firebase = require("firebase");
var _ = require('lodash');

//Initialize variables
var portfolioUpdater;
var FETCH_INTERVAL = 5000;
var examplePlayer = new Firebase("https://realtimetrade.firebaseio.com/examplePlayer");
var portfolio = examplePlayer.child('portfolio');

//Start the portfolio updater
function startPortfolioUpdater() {
	portfolioUpdater = setInterval(updatePortfolio, FETCH_INTERVAL);
}

//Update player's portfolio
function updatePortfolio() {
	portfolio.once('value', function (p) {
		if (!p) { return; }
		
		//Param must exist for getStockValues to return correctly, so if empty, I use SPY and throw it away
		var portfolioArray = _.toArray(p.val());
		var symbols = (portfolioArray && portfolioArray.length > 0) ? _.pluck(portfolioArray, 'symbol') : ['SPY'];

		//Push the new earnings to the database
		getStockPrices(symbols).then(function (stockValues) {
			var data = examplePlayer.child('data');
			data.once('value', function (history) {
				var previousEarnings = _.last(_.last(_.toArray(history.val())));
				getPortfolioValue(portfolio, previousEarnings, stockValues).then(function (portfolioValue) {
					console.log(portfolioValue);
				});
				//data.push([Date.now(), portfolioValue]);
			});
		});
	});
	
	/*
	examplePlayer.once('value', function (data) {
		
		
		//Push the new earnings to the database
		getStockPrices(symbols).then(function (stockValues) {
			var previousEarnings = _.last(_.last(player.data));
			var portfolioValue = getPortfolioValue(player.portfolio, previousEarnings, stockValues);
			console.log(portfolioValue);
			examplePlayerDB.child('data').push([Date.now(), portfolioValue]);
			console.log('pushed');
		});
	});
	*/
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
	var deferred = Q.defer();
	
	//If this is the first entry, initialize to $1M
	if (!previousEarnings) {
		previousEarnings = 1000000;
	}
			
	//Find how much is held in currency
	portfolio.on('value', function (portfolioArray) {
		portfolioArray = _.toArray(portfolioArray.val());

		var unusedPercentage = 100 - _.sum(portfolioArray, 'percentage');
		var total = previousEarnings * (unusedPercentage / 100);

		//Find new earnings
		if (unusedPercentage < 100) {
			total += _.reduce(stockValues, function (total, stockValue, i) {
				var stock = portfolioArray[i];

				if (!stock.shares) {
					stock.shares = getNumberOfShares(previousEarnings, stock.percentage, stockValue)
					portfolio.update(stock);
				}

				return total + Number(stockValue) * stock.shares;
			}, 0);
		}
	
		//Update share counts
		_.times(portfolioArray.length, function (i) {
			portfolioArray[i].shares = getNumberOfShares(previousEarnings, portfolioArray[i].percentage, stockValues[i]);
			portfolio.update(portfolioArray[i]);
		});

		deferred.resolve(roundNumber(total));
	});

	return deferred.promise;
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
	server.all('/*', function (request, response) {
		return response.redirect('/src/');
	});
	server.listen(port);
	console.log("Server listening on port", port);
}

//Start the server
listen(process.env.PORT || 8080);
startPortfolioUpdater();