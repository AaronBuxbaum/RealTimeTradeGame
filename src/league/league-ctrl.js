/**
* @ngdoc controller
* @name League.controller:LeagueCtrl
*
* @description
*
* @requires LeagueService
**/
angular.module('League').controller('LeagueCtrl', function (LeagueService) {
    var ctrl = this;

    ctrl.uid = auth.uid;
    ctrl.league = LeagueService.league;
    ctrl.leagues = LeagueService.leagues;
    ctrl.joinLeague = LeagueService.joinLeague;
    ctrl.createLeague = LeagueService.createLeague;
    ctrl.leaveLeague = LeagueService.leaveLeague;
});