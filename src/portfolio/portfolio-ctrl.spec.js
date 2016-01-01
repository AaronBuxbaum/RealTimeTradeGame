describe('PortfolioCtrl', function () {
    var ctrl, $scope, $controller, getPortfolioSpy;

    beforeEach(function () {
        module('Portfolio');
    });

    var startController = function () {
        ctrl = $controller('PortfolioCtrl', { $scope: $scope });
    };

    beforeEach(inject(function (_$controller_, $rootScope, PortfolioService, AuthenticationService) {
        $scope = $rootScope.$new();
        $controller = _$controller_;
        spyOn(AuthenticationService, 'getUserID').and.returnValue(0);
        getPortfolioSpy = spyOn(PortfolioService, 'getPortfolio').and.returnValue({
            $loaded: function (callback) { callback(); }
        });
    }));

    describe('it hooks into services', function () {
        it('calls the getPortfolio function', function () {
            expect(getPortfolioSpy).not.toHaveBeenCalled();
            startController();
            expect(getPortfolioSpy).toHaveBeenCalled();
        });

        it('sets the controller functions after getPortfolio resolves', function () {
            startController();
            expect(ctrl.isLoaded).toBeTruthy();
            expect(_.isFunction(ctrl.updateStock)).toBeTruthy();
            expect(_.isFunction(ctrl.deleteStock)).toBeTruthy();
            expect(_.isFunction(ctrl.getMax)).toBeTruthy();
        });
    });
});