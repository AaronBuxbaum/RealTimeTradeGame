StockSelection.directive('stockSlider', function () {
	return {
		restrict: 'E',
		templateUrl: 'stock-selection/stock-slider.html',
		controller: _.noop,
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {
			stock: '=',
			getMax: '='
		}
	};
});