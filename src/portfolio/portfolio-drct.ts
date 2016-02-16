/**
* @ngdoc directive
* @name RealTimeTrade.Portfolio.directive:portfolio
* @restrict E
* @element portfolio
* @scope
*
* @description
**/
angular.module('RealTimeTrade.Portfolio').directive('portfolio', function () {
	return {
		restrict: 'E',
		templateUrl: 'portfolio/portfolio.html',
		controller: 'PortfolioCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});