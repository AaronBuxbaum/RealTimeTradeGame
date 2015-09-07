Loading.controller('LoadingCtrl', function ($mdDialog) {
    $mdDialog.show({
        templateUrl: 'loading/loading.html',
        escapeToClose: false
    });
});