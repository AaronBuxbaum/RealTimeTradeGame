//Dependencies
var _ = require('lodash');
var http = require('q-io/http');
var Q = require('q');
var Firebase = require('firebase');
var yahooFinance = require('yahoo-finance');
var token = require('./token.js');

//Initialize variables
var ref = new Firebase('https://realtimetrade.firebaseio.com');
var usersRef = ref.child('users');
var seriesRef = ref.child('series');
var portfoliosRef = ref.child('portfolios');

//Update player's portfolio
function updatePortfolio() {
	usersRef.once('value', function (users) {
		token.authenticate(seriesRef, 'admin').then(function () {
			return _.forOwn(users.val(), function (user) {
				if (user.uid) {
					getEarnings(user.uid);
				}
			});
		});
	});
}

function getEarnings(uid) {
	var userEarnings = seriesRef.child(uid);
	//Push the new earnings to the database
	userEarnings.orderByChild('0').limitToLast(1).once('value', function (previousEarningsArr) {
		var portfolioRef = portfoliosRef.child(uid);

		if (previousEarningsArr.val()) {
			var previousEarnings = _.toArray(previousEarningsArr.val())[0][1];
		}

		getPortfolioValue(portfolioRef, previousEarnings, uid).then(function (portfolioValue) {
			userEarnings.push([Date.now(), portfolioValue]);
		});
	});
}



/* Portfolio value functions */

//Return the value of the player's portfolio
function getPortfolioValue(portfolioRef, previousEarnings, uid) {
	var deferred = Q.defer();

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
		if (!tickers.length) {
			tickers = ['F'];
		}
		yahooFinance.snapshot({
			symbols: tickers,
			fields: ['b', 'b2', 'b3']
		}).then(function (stocks) {
			_.forOwn(portfolio, function (stock) {
				var stockValue = _.find(stocks, { symbol: stock.ticker }).bid;
				stock.shares = previousEarnings * (stock.percentage / 100) / stock.value || stockValue;
				stock.value = stockValue;
				total += stockValue * stock.shares;
			});

			//Update stock values
			portfolioRef.set(portfolio);
			deferred.resolve(roundNumber(total));
		});
	});

	return deferred.promise;
}

//Round to 2 decimal places to avoid Javascript numeric bugs (ie. 1000.00000001)
function roundNumber(num) {
	return Math.round(Number(num) * 100) / 100;
}

module.exports.updatePortfolio = updatePortfolio;