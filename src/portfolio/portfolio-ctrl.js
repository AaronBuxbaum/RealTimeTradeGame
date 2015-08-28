Portfolio.controller('PortfolioCtrl', function (AuthenticationService, PortfolioService) {
    var ctrl = this;

    AuthenticationService.auth.$onAuth(function (auth) {
        ctrl.portfolio = (auth) ? PortfolioService.getPortfolio(auth.uid) : null;
        ctrl.updateStock = PortfolioService.saveStock;
        ctrl.deleteStock = PortfolioService.deleteStock;
        ctrl.getMax = PortfolioService.getUnusedPercentage;
    });
});