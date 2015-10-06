/**
* @ngdoc controller
* @name League.controller:LeagueCtrl
*
* @description
*
* @requires LeagueService
* @requires AuthenticationService
**/
angular.module('League').controller('LeagueCtrl', function (LeagueService, AuthenticationService) {
    var ctrl = this;

    ctrl.uid = AuthenticationService.getUserID();
    ctrl.league = LeagueService.league;
    ctrl.leagues = LeagueService.leagues;
    ctrl.joinLeague = LeagueService.joinLeague;
    ctrl.createLeague = LeagueService.createLeague;
    ctrl.leaveLeague = LeagueService.leaveLeague;
});