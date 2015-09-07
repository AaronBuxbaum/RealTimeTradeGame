//Dependencies
var Firebase = require('firebase');
var _ = require('lodash');

//Initialize variables
var seriesRef = new Firebase('https://realtimetrade.firebaseio.com/series');

function dailyBatch() {
	console.log('Batcher utility started');

	seriesRef.once('value', function (series) {
		_.forEach(series.val(), function (s) {
			console.log(s);
		});
	});

	console.log('Batcher utility finished successfully');
}

module.exports.dailyBatch = dailyBatch;