StockAddNew.directive('stockAddNew', function () {
	return {
		restrict: 'E',
		templateUrl: 'stocks/add-new/stock-add-new.html',
		controller: 'StockAddNewCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {}
	};
});