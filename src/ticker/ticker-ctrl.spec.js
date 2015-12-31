describe('TickerCtrl', function () {
    var ctrl;

    beforeEach(function () {
        module('Ticker');
    });

    beforeEach(inject(function ($controller) {
        ctrl = $controller('TickerCtrl', {});
    }));
});