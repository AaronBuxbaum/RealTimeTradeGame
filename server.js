//Dependencies
var express = require('express');
var server = express();
var Q = require('q');
var http = require('q-io/http');
var Firebase = require('firebase');
var moment = require('moment');
var timezone = require('moment-timezone');
var _ = require('lodash');

//Initialize variables
var PORTFOLIO_UPDATER;
var FETCH_INTERVAL = 15 * 1000;
var EDT = 'America/New_York';
var MARKET_OPEN = moment().tz(EDT).hour(9).minute(30);
var MARKET_CLOSE = moment().tz(EDT).hour(16);
var ref = new Firebase('https://realtimetrade.firebaseio.com');
var usersRef = ref.child('users');
var portfoliosRef = ref.child('portfolios');
var seriesRef = ref.child('series');



/* Updater */

//Check the time
function checkTime() {
	if (isMarketOpen()) {
		startPortfolioUpdater();
	}
	else {
		stopPortfolioUpdater();
	}
}

//Check if the stock market is open
function isMarketOpen() {
	var now = moment().tz(EDT);

	if (now.day() < 1 || now.day() > 5) {
		return false;
	}

	if (isNationalHoliday(now)) {
		return false;
	}

	return now.isBetween(MARKET_OPEN, MARKET_CLOSE);
}

//Check if it is a national holiday
function isNationalHoliday(date) {
	/*
		Due to complexity of holidays, currently it'll be hardcoded with each day of the year for now.
		This will need to be updated each year.
		
		The following are the stock market off days:
		-New Year's Day
		-Martin Luther King, Jr. Day
		-President's Day
		-Good Friday
		-Memorial Day
		-Independence Day
		-Labor Day
		-Thanksgiving Day
		-Christmas Day
		
		As well as an early close (1 PM) on Thanksgiving and Christmas. (currently unimplemented)
	*/
	var holidays = {
		'09/07/15': 'Labor Day',
		'11/26/15': 'Thanksgiving Day',
		'12/25/15': 'Christmas Day',
		'01/01/16': 'New Year\'s Day',
		'01/18/16': 'Martin Luther King, Jr. Day',
		'02/15/16': 'President\'s Day',
		'03/25/16': 'Good Friday',
		'05/30/16': 'Memorial Day',
		'07/04/16': 'Independence Day',
		'09/05/16': 'Labor Day',
		'11/24/16': 'Thanksgiving Day',
		'12/26/16': 'Christmas Day'
	};

	return holidays[date.format('MM/DD/YY')];
}

//Start the portfolio updater
function startPortfolioUpdater() {
	if (PORTFOLIO_UPDATER) {
		return;
	}

	PORTFOLIO_UPDATER = setInterval(updatePortfolio, FETCH_INTERVAL);
	console.log('Portfolio updater started');
}

//Stop the portfolio updater
function stopPortfolioUpdater() {
	if (!PORTFOLIO_UPDATER) {
		return;
	}

	clearInterval(PORTFOLIO_UPDATER);
	PORTFOLIO_UPDATER = null;
	console.log('Portfolio updater stopped');
}



/* Update functionality */

//Update player's portfolio
function updatePortfolio() {
	usersRef.once('value', function (users) {
		return _.forOwn(users.val(), function (user) {
			if (user.uid) {
				getEarnings(user.uid);
			}
		});
	});
}

function getEarnings(uid) {
	//Push the new earnings to the database
	seriesRef.child(uid).once('value', function (series) {
		var portfolioRef = portfoliosRef.child(uid);
		var previousEarnings = _.last(_.last(_.toArray(series.val())));

		getPortfolioValue(portfolioRef, previousEarnings).then(function (portfolioValue) {
			seriesRef.child(uid).push([Date.now(), portfolioValue]);
		});
	});
}



/* Portfolio value functions */

//Return the value of the player's portfolio
function getPortfolioValue(portfolioRef, previousEarnings) {
	var defer = Q.defer();

	portfolioRef.once('value', function (response) {
		var portfolio = response.val();
		//If this is the first entry, initialize to $1M
		if (!previousEarnings) {
			previousEarnings = 1000000;
		}

		//Initialize cash
		var unusedPercentage = 100 - _.sum(portfolio, 'percentage');
		var total = previousEarnings * (unusedPercentage / 100);

		//Find new earnings
		var tickers = _.pluck(_.toArray(portfolio), 'ticker');

		getStockPrices(tickers).then(function (stockValues) {
			var stockValuesMap = _.zipObject(tickers, stockValues);

			_.forOwn(portfolio, function (stock, key) {
				var stockValue = Number(stockValuesMap[stock.ticker]);
				stock.shares = previousEarnings * (stock.percentage / 100) / stock.value;
				stock.value = stockValue;
				total += stockValue * stock.shares;
			});
			
			//Update stock values
			portfolioRef.set(portfolio);

			defer.resolve(roundNumber(total));
		});
	});

	return defer.promise;
}

//Get prices for an array of stock tickers
function getStockPrices(tickers) {
	//Param must exist for getStockValues to return correctly, so if empty, I use SPY and throw it away
	if (!tickers || !tickers.length) {
		tickers = ['SPY']
	}

	return http.request({
		url: 'https://finance.google.com/finance/info?q=' + tickers.join(','),
		method: 'GET'
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
checkTime();
setInterval(checkTime, FETCH_INTERVAL * 5);