/**
* @ngdoc controller
* @name CreateLeague.controller:CreateLeagueCtrl
*
* @description
**/
angular.module('CreateLeague').controller('CreateLeagueCtrl', function () {
    var ctrl = this;

    //Minimum bid is $1.50 per day
    ctrl.updateMinBid = function () {
        var numDays = (ctrl.closeDate - ctrl.startDate) / 1000 / 60 / 60 / 24;
        ctrl.minBid = (numDays > 0) ? numDays * 1.5 : 0;
    };

    ctrl.totalWinnings = function () {
        if (!ctrl.bid) {
            ctrl.bid = ctrl.minBid;
        }
        else if (ctrl.minBid > ctrl.bid) {
            ctrl.bid = ctrl.minBid;
        }
        return ctrl.bid * ctrl.maxPlayers * 0.95;
    };

    ctrl.createLeague = function () {
        /*
        CreateLeagueService.createService({
            name: ctrl.name,
            id: 'MY_USER_ID',
            bid: ctrl.bid,
            minBid: ctrl.minBid,
            winnings: ctrl.totalWinnings,
            maxPlayers: ctrl.maxPlayers,
            startDate: ctrl.startDate,
            closeDate: ctrl.closeDate
        });
        */
    };

    ctrl.reset = function () {
        ctrl.name = null;
        ctrl.bid = null;
        ctrl.minBid = null;
        ctrl.totalWinnings = null;
        ctrl.maxPlayers = null;
        ctrl.startDate = null;
        ctrl.closeDate = null;
    };
});