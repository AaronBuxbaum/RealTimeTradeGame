/**
* @ngdoc directive
* @name AddNewStock.directive:addNewStock
* @restrict E
* @element add-new-stock
* @scope
*
* @description
**/
angular.module('AddNewStock').directive('addNewStock', function () {
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