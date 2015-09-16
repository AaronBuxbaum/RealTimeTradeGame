//Dependencies
var Firebase = require('firebase');
var _ = require('lodash');
var marketOpen = require('./market-open.js');
var token = require('./token.js');

//Initialize variables
var ref = new Firebase('https://realtimetrade.firebaseio.com/series');

function dailyBatch() {
	if (marketOpen.isMarketOpen()) {
		return;
	}

	console.log('Batcher utility started');

	//Run for every series
	token.authenticate(ref, 'admin').then(function () {
		ref.once('value', function (s) {
			s.forEach(function (userSeries) {
				//Get the entries only for this previous day
				var timestamp = new Date();
				timestamp.setHours(9);
				var entriesForDay = userSeries.ref().orderByChild('0').startAt(timestamp.getTime());

				//Handle the entries for this day
				entriesForDay.once('value', function (entries) {
					var series = _.toArray(entries.val());

					//Keep only every 15th element
					for (var i = 0; i < series.length; i += 15) {
						userSeries.ref().push(series[i]);
					}

					//Clear out the old elements
					entries.forEach(function (entry) {
						userSeries.child(entry.key()).ref().remove();
					});
				});
			});
		});
	});
}

module.exports.dailyBatch = dailyBatch;