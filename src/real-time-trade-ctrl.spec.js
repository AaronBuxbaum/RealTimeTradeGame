describe('RealTimeTradeCtrl', function () {
    var ctrl;

    beforeEach(function () {
        module('RealTimeTrade');
    });

    beforeEach(inject(function ($controller, $rootScope) {
        ctrl = $controller('RealTimeTradeCtrl', {
            $scope: $rootScope.$new()
        });
    }));

    it('should run this test', function () {
        expect(1 + 1).toBe(2);
    });
});