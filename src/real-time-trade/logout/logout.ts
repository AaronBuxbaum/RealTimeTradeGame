/**
* @ngdoc directive
* @name RealTimeTrade.Logout.component:logout
* @element logout
* @scope
*
* @description
* A logout button that deauthorizes the user.
**/
angular.module('RealTimeTrade.Logout').component('logout', {
		templateUrl: 'real-time-trade/logout/logout.html',
		controller: 'LogoutCtrl'
});