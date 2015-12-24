/**
* @ngdoc controller
* @name Loading.controller:LoadingCtrl
*
* @description
*
* @requires $mdDialog
**/
angular.module('Loading').controller('LoadingCtrl', function ($mdDialog) {
    $mdDialog.show({
        templateUrl: 'general/loading/loading.html',
        escapeToClose: false
    });
});