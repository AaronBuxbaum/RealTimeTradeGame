describe('AddNewStockService', function () {
    var svc;

    beforeEach(function () {
        module('AddNewStock');
    });

    beforeEach(inject(function (_AddNewStockService_) {
        svc = _AddNewStockService_;
    }));

    describe('getStocks', function () {
        it('should have an getStocks function', function () {
            expect(_.isFunction(svc.getStocks)).toBeTruthy();
        });
    });
});