Portfolio.directive('portfolio', function () {
	return {
		restrict: 'E',
		templateUrl: 'portfolio/portfolio.html',
		controller: 'PortfolioCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});