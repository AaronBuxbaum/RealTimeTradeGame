describe('PortfolioCtrl', function () {
    var ctrl, $scope, PortfolioService;

    beforeEach(function () {
        module('Portfolio');
    });

    beforeEach(inject(function ($controller, _PortfolioService_, _AuthenticationService_) {
        var $scope = {};
        ctrl = $controller('PortfolioCtrl', { $scope: $scope });
        PortfolioService = _PortfolioService_;

        spyOn(_AuthenticationService_, 'getUserID').andReturn(0);
    }));

    xdescribe('it hooks into services', function () {
        spyOn(PortfolioService, 'getPortfolio');
        $scope.$apply();
        expect(PortfolioService.getPortfolio).toHaveBeenCalled();
    });
});