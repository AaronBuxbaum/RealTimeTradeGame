/**
* @ngdoc controller
* @name Login.controller:LoginCtrl
*
* @description
*
* @requires $mdDialog
**/
angular.module('Login').controller('LoginCtrl', function ($mdDialog) {
    $mdDialog.show({
        controller: function (AuthenticationService) {
            var ctrl = this;
            ctrl.logIn = AuthenticationService.logIn;
            ctrl.signUp = AuthenticationService.signUp;
        },
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'real-time-trade/login/login.html',
        escapeToClose: false
    });
});