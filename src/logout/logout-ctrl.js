/**
* @ngdoc controller
* @name Logout.controller:LogoutCtrl
*
* @description
*
* @requires AuthenticationService
**/
angular.module('Logout').controller('LogoutCtrl', function (AuthenticationService) {
    var ctrl = this;
    
    ctrl.logOut = AuthenticationService.logOut;
});