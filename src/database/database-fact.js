Database.factory('DatabaseService', function ($http, $firebaseArray, $firebaseObject) {
	var svc = this;
	
	/*
	//Get firebase reference
	svc.ref = new Firebase("https://realtimetrade.firebaseio.com/league");
	
	//Return firebase reference object
	svc.getReference = function () {
		return svc.ref;
	};
	
	//Return firebase sync object
	svc.getSyncObject = function () {
		return $firebaseObject(svc.ref);
	};

	svc.getSyncArray = function (ref) {
		return $firebaseArray(svc.ref);
	};


	//Example data
	[
		{
			id: 1,
			data: [
				[1000000000001, 60.45],
				[1147651200000, 23.15],
				[1147737600000, 23.01],
				[1147824000000, 22.73],
				[1147910400000, 22.83],
				[1147996800000, 22.56],
				[1148256000000, 22.88],
				[1148342400000, 22.79],
				[1148428800000, 23.50],
				[1148515200000, 23.74],
				[1148601600000, 23.72],
				[1148947200000, 23.15],
				[1149033600000, 22.65]
			]
		}, {
			id: 2,
			data: [
				[1147651200000, 25.15],
				[1147737600000, 25.01],
				[1147824000000, 25.73],
				[1147910400000, 25.83],
				[1147996800000, 25.56],
				[1148256000000, 25.88],
				[1148342400000, 25.79],
				[1148428800000, 25.50],
				[1148515200000, 26.74],
				[1148601600000, 26.72],
				[1148947200000, 26.15],
				[1149033600000, 26.65]
			]
		}
	];*/

	svc.examplePlayer = {
		id: 1,
		name: 'Aaron',
		stocks: [], //TODO: use a set instead to ensure unique elements in O(1)
		data: []
	};

	svc.examplePlayers = [
		svc.examplePlayer
	];

	svc.exampleAddStock = function (stock) {
        stock.percentage = 0;
        svc.examplePlayer.stocks.push(stock);
	};

	svc.exampleDeleteStock = function (index) {
		svc.examplePlayer.stocks.splice(index, 1);
	};

	svc.generateExampleEmptyArray = function (numPlayers) {
		svc.example = _.times(numPlayers, function (n) {
			return {
				id: n,
				data: []
			};
		});
		return svc.example;
	};

	svc.addExamplePoints = function () {
		_.forEach(svc.example, function (player) {
			player.data.push([Date.now(), Math.random() * 100]);
		});
	};
	
	//Assumes stocks are an array of objects that have attributes of symbol (String) and percentage (Number)
	svc.getValueOfStocks = function () {
		if (svc.examplePlayer.length <= 0) {
			return;
		}

        $http({
            method: 'JSONP',
            url: 'http://finance.google.com/finance/info',
            params: {
                q: _.pluck(svc.examplePlayer.stocks, 'symbol').join(','),
                callback: 'JSON_CALLBACK'
            }
        }).then(function (response) {
			var total = 0;

			_.forEach(response.data, function (val, index) {
				total += val.l * (svc.examplePlayer.stocks[index].percentage / 100);
			});

			//TODO: working on this logic here
			//perhaps give a 'cash' attribute or something?
			//var previousValue = _.last(_.last(svc.examplePlayer.data));
			
			svc.examplePlayer.data.push([Date.now(), total]);
		});
	};

	return svc;
});