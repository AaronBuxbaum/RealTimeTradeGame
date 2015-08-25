Portfolio.controller('PortfolioCtrl', function ($firebaseArray, PlayerService) {
    var ctrl = this;

    ctrl.userId = 1;
    ctrl.portfolio = PlayerService.portfolio;
    ctrl.deleteStock = PlayerService.deleteStock;

    ctrl.getMax = function (curr) {
        return PlayerService.getUnusedPercentage(ctrl.userId) + curr;
    };
});