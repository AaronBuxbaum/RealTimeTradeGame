Ticker.directive('ticker', function () {
	return {
		restrict: 'E',
		templateUrl: 'ticker/ticker.html',
		controller: 'TickerCtrl as ctrl',
		scope: true,
		bindToController: {}
	};
});