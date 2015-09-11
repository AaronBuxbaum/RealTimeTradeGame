angular.module('League').controller('LeagueCtrl', function (LeagueService, AuthenticationService) {
    var ctrl = this;

    AuthenticationService.auth.$onAuth(function (auth) {
        if (!auth) {
            return;
        }

        ctrl.uid = auth.uid;
        ctrl.league = LeagueService.league;
        ctrl.leagues = LeagueService.leagues;
        ctrl.joinLeague = LeagueService.joinLeague;
        ctrl.createLeague = LeagueService.createLeague;
        ctrl.leaveLeague = LeagueService.leaveLeague;
    });
});