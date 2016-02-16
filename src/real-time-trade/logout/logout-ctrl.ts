/**
* @ngdoc controller
* @name RealTimeTrade.Logout.controller:LogoutCtrl
*
* @description
*
* @requires AuthenticationService
**/
angular.module('RealTimeTrade.Logout').controller('LogoutCtrl', function (AuthenticationService) {
    var ctrl = this;
    
    ctrl.logOut = AuthenticationService.logOut;
});