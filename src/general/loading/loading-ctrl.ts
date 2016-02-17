/**
* @ngdoc controller
* @name RealTimeTrade.controller:LoadingCtrl
*
* @description
*
* @requires $mdDialog
**/
angular.module('RealTimeTrade').controller('LoadingCtrl', function ($mdDialog) {
    $mdDialog.show({
        templateUrl: 'general/loading/loading.html',
        escapeToClose: false
    });
});