describe('PortfolioCtrl', function () {
    var ctrl, PortfolioService;

    beforeEach(function () {
        module('Portfolio');
    });

    beforeEach(inject(function ($controller, _PortfolioService_) {
        ctrl = $controller('PortfolioCtrl', {});
        PortfolioService = _PortfolioService_;
    }));
});