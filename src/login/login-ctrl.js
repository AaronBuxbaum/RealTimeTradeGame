Login.controller('LoginCtrl', function ($mdDialog) {
    var ctrl = this;

    ctrl.showDialog = function () {
        $mdDialog.show({
            controller: function (AuthenticationService) {
                var ctrl = this;
                ctrl.logIn = AuthenticationService.logIn;
                ctrl.signUp = AuthenticationService.signUp;
            },
            controllerAs: 'ctrl',
            bindToController: true,
            templateUrl: 'login/login.html',
            escapeToClose: false
        });
    };
});