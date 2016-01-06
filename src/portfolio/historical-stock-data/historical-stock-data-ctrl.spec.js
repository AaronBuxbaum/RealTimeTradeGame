describe('HistoricalStockDataCtrl', function () {
    var ctrl, createController;

    beforeEach(function () {
        module('RealTimeTrade.Portfolio');
    });

    beforeEach(inject(function ($controller, $rootScope) {
        createController = function () {
            ctrl = $controller('HistoricalStockDataCtrl', { $scope: $rootScope.$new() });
        };
    }));
});