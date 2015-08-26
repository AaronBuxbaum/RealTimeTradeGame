AddNewStock.directive('addNewStock', function () {
	return {
		restrict: 'E',
		templateUrl: 'portfolio/add-new-stock/add-new-stock.html',
		controller: 'AddNewStockCtrl',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {
			isOpen: '=?'
		}
	};
});