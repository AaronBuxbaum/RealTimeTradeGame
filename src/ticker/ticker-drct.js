Ticker.directive('ticker', function () {
	return {
		restrict: 'E',
		templateUrl: 'ticker/ticker.html',
		controller: 'TickerCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});