Portfolio.controller('PortfolioCtrl', function (PlayerService) {
    var ctrl = this;

    ctrl.userId = 1;
    ctrl.portfolio = PlayerService.portfolio;
    ctrl.deleteStock = PlayerService.deleteStock;
    ctrl.getMax = PlayerService.getUnusedPercentage;
});