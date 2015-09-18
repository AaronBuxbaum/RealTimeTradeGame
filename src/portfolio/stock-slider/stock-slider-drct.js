/**
* @ngdoc directive
* @name StockSlider.directive:stockSlider
* @restrict E
* @element stock-slider
* @scope
*
* @description
**/
angular.module('StockSlider').directive('stockSlider', function () {
	return {
		restrict: 'E',
		templateUrl: 'portfolio/stock-slider/stock-slider.html',
		require: 'ngModel',
		controller: 'StockSliderCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		transclude: true,
		scope: {
			name: '@',
			percentage: '=ngModel',
			ngChange: '=?'
		}
	};
});