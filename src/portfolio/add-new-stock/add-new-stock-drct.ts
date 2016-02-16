/**
* @ngdoc directive
* @name RealTimeTrade.Portfolio.directive:addNewStock
* @restrict E
* @element add-new-stock
* @scope
*
* @description
**/
angular.module('RealTimeTrade.Portfolio').directive('addNewStock', function () {
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