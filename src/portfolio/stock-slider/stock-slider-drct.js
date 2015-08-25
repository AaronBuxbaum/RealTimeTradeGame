StockSlider.directive('stockSlider', function () {
	return {
		restrict: 'E',
		templateUrl: 'portfolio/stock-slider/stock-slider.html',
		controller: 'StockSliderCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		transclude: true,
		scope: {
			stock: '=',
			getMax: '='
		}
	};
});