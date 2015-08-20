StockSelection.directive('stockSelection', function () {
	return {
		restrict: 'E',
		templateUrl: 'stock-selection/stock-selection.html',
		controller: 'StockSelectionCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});