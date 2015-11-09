angular.module('Portfolio').factory('PortfolioService', function ($firebaseArray) {
	var svc = this;
	svc.portfolio;

	svc.getPortfolio = function (uid) {
		var portfolioRef = new Firebase('https://realtimetrade.firebaseio.com/portfolios');
		svc.portfolio = $firebaseArray(portfolioRef.child(uid));
		return svc.portfolio;
	};
	
	//Add a stock to a player
	svc.addStock = function (stock) {
		if (!stock || !svc.portfolio || !stock.value || _.find(svc.portfolio, { ticker: stock.ticker })) {
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