Portfolio.controller('PortfolioCtrl', function (LeagueService, PlayerService) {
    var ctrl = this;
    ctrl.userId = 1;

    ctrl.portfolio = LeagueService.getPlayer(ctrl.userId).portfolio;
    ctrl.getValue = PlayerService.updatePortfolio;

    ctrl.deleteStock = function (index) {
        PlayerService.deleteStock(ctrl.userId, index);
    };

    ctrl.getMax = function (curr) {
        return PlayerService.getUnusedPercentage(ctrl.userId) + curr;
    };
});