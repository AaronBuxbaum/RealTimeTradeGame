About.controller('AboutCtrl', function ($mdDialog, $templateCache) {
    var ctrl = this;

    ctrl.openAbout = function ($event) {
        $mdDialog.show({
            title: 'About',
            templateUrl: 'about/about-dialog.html',
            ok: 'Close',
            targetEvent: $event,
            closeOutsideToClose: true,
            controller: function ($scope, $mdDialog) {
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }
            }
        });
    };
});