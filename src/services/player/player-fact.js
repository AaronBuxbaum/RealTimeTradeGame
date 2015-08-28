Player.factory('PlayerService', function (AuthenticationService, $firebaseArray, $firebaseObject) {
	var svc = this;

	var usersRef = new Firebase('https://realtimetrade.firebaseio.com');
	var examplePlayer = usersRef.child('examplePlayer');
	svc.examplePlayer = $firebaseObject(examplePlayer);
    svc.portfolio = $firebaseArray(examplePlayer.child('portfolio'));
	svc.data = $firebaseArray(examplePlayer.child('data'));
	
	//Get a player object
	svc.getPlayer = function () {
		var uid = AuthenticationService.getUserID();
		return $firebaseObject(usersRef.child(uid));
	};
	
	//Add a stock to a player
	svc.addStock = function (stock) {
		if (!stock || _.find(svc.portfolio, { ticker: stock.ticker })) {
			return;
		}

        stock.percentage = 0;
		svc.portfolio.$add(stock);
	};
	
	//Save changes to a stock
	svc.saveStock = function (stock) {
		svc.portfolio.$save(stock);
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