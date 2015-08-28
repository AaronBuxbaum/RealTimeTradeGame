Logout.controller('LogoutCtrl', function (AuthenticationService) {
    var ctrl = this;
    
    ctrl.logOut = AuthenticationService.logOut;
});