Stocks.directive('stocks', function () {
	return {
		restrict: 'E',
		templateUrl: 'stocks/stocks.html',
		controller: 'StocksCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});