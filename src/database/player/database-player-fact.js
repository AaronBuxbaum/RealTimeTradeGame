Player.factory('PlayerService', function ($firebaseArray, $http, LeagueService) {
	var svc = this;

	var player = new Firebase("https://realtimetrade.firebaseio.com/examplePlayer")
	var portfolio = player.child('portfolio');
    svc.portfolio = $firebaseArray(portfolio);
	
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
	svc.getUnusedPercentage = function (id) {
		portfolio.once('value', function (value) {
			return 100 - _.sum(value, 'percentage');
		});
	};

	return svc;
});