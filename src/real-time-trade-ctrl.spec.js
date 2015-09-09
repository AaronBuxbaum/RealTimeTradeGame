describe('RealTimeTradeCtrl', function () {
    var $scope;
    var controller;

    beforeEach(function () {
        module('RealTimeTrade');
    });

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        controller = $controller('RealTimeTradeCtrl', {
            $scope: $scope
        });
    }));

    it("Should say hello", function () {
        expect($scope.leagueName).toBe("Hello");
    });
});