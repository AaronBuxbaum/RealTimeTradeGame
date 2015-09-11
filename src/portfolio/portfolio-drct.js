angular.module('Portfolio').directive('portfolio', function () {
	return {
		restrict: 'E',
		templateUrl: 'portfolio/portfolio.html',
		controller: 'PortfolioCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {},
		link: function (scope, elem, attrs, ctrl) {
			scope.$watch('ctrl.portfolio.league', ctrl.authAndUpdate);
		}
	};
});