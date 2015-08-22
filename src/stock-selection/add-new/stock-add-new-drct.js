StockAddNew.directive('stockAddNew', function () {
	return {
		restrict: 'E',
		templateUrl: 'stock-selection/add-new/stock-add-new.html',
		controller: 'StockAddNewCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});