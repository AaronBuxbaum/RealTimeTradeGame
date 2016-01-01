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
});