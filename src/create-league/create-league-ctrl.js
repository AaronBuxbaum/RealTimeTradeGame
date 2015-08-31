CreateLeague.controller('CreateLeagueCtrl', function () {
    var ctrl = this;

    ctrl.updateMinBid = function () {
        ctrl.minBid = Math.random() * 1000;
    };

    ctrl.totalWinnings = function () {
        return ctrl.bid * ctrl.maxPlayers * 0.95;
    }
});