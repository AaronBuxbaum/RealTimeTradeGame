Player.factory('PlayerService', function ($firebaseArray, $firebaseObject) {
	var svc = this;

	var player = new Firebase("https://realtimetrade.firebaseio.com/examplePlayer")
	svc.player = $firebaseObject(player);
    svc.portfolio = $firebaseArray(player.child('portfolio'));
	svc.data = $firebaseArray(player.child('data'));
	
	//Add a stock to a player
	svc.addStock = function (stock) {
        stock.percentage = 0;
		svc.portfolio.$add(stock);
	};

	//Delete a stock from a player
	svc.deleteStock = function (index) {
		svc.portfolio.$remove(index);
	};
	
	//Find what percentage of the portfolio is unused (int between 0 and 100, inclusive).
	//Optionally tacks on an extra addition number.
	svc.getUnusedPercentage = function (plus) {
		return 100 - _.sum(svc.portfolio, 'percentage') + (plus || 0);
	};

	return svc;
});