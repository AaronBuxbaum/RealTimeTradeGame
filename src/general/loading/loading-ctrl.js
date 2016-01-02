/**
* @ngdoc controller
* @name RealTimeTrade.Loading.controller:LoadingCtrl
*
* @description
*
* @requires $mdDialog
**/
angular.module('RealTimeTrade.Loading').controller('LoadingCtrl', function ($mdDialog) {
    $mdDialog.show({
        templateUrl: 'general/loading/loading.html',
        escapeToClose: false
    });
});