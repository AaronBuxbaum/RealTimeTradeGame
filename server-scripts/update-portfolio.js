//Dependencies
var _ = require('lodash');
var http = require('q-io/http');
var Q = require('q');
var Firebase = require('firebase');
//var pubnub = require('pubnub');
var token = require('./token.js');

//Initialize variables
var ref = new Firebase('https://realtimetrade.firebaseio.com');
var usersRef = ref.child('users');
var seriesRef = ref.child('series');
var portfoliosRef = ref.child('portfolios');

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
	var userEarnings = seriesRef.child(uid);
	token.authenticate(userEarnings, uid).then(function () {
		//Push the new earnings to the database
		userEarnings.orderByChild('0').limitToLast(1).once('value', function (previousEarningsArr) {
			var portfolioRef = portfoliosRef.child(uid);
			var previousEarnings = _.toArray(previousEarningsArr.val())[0];

			if (!_.isArray(previousEarnings)) {
				return;
			}

			getPortfolioValue(portfolioRef, previousEarnings[1], uid).then(function (portfolioValue) {
				userEarnings.push([Date.now(), portfolioValue]);
			});
		});
	}, console.error);
}



/* Portfolio value functions */

//Return the value of the player's portfolio
function getPortfolioValue(portfolioRef, previousEarnings, uid) {
	var deferred = Q.defer();

	token.authenticate(portfolioRef, uid).then(function () {
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

				deferred.resolve(roundNumber(total));
			});
		});
	});

	return deferred.promise;
}

//Get prices for an array of stock tickers
function getStockPrices(tickers) {
	//Param must exist for getStockValues to return correctly, so if empty, I use SPY and throw it away
	if (!tickers || !tickers.length) {
		tickers = ['SPY']
	}

	var url = 'https://finance.google.com/finance/info?q=' + tickers.join(',');
	return http.request(url).then(function (response) {
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

/*
var getStocks = pubnub.init({
	windowing: 1000,
	timeout: 15000,
	subscribe_key: 'demo'
});

getStocks.subscribe({
	channel: ['GOOG', 'AAPL'],
	message: function (a) { console.log(a); }
});
*/

module.exports.updatePortfolio = updatePortfolio;