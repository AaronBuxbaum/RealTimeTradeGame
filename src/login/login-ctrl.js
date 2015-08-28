Login.controller('LoginCtrl', function (AuthenticationService) {
    var ctrl = this;

    ctrl.logIn = AuthenticationService.logIn;
    ctrl.signUp = AuthenticationService.signUp;
});