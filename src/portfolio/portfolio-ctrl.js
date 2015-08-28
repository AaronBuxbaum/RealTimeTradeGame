Portfolio.controller('PortfolioCtrl', function (PortfolioService) {
    var ctrl = this;

    ctrl.portfolio = PortfolioService.portfolio;
    ctrl.updateStock = PortfolioService.saveStock;
    ctrl.deleteStock = PortfolioService.deleteStock;
    ctrl.getMax = PortfolioService.getUnusedPercentage;
});