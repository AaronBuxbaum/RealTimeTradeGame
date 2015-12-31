describe('PortfolioService', function () {
    var svc;

    beforeEach(function () {
        module('Portfolio');
    });

    beforeEach(inject(function (_PortfolioService_) {
        svc = _PortfolioService_;
        
        //Mock out the firebase array
        svc.portfolio = [];
        svc.portfolio.$add = _.noop;
    }));

    describe('getPortfolio', function () {
        it('should have an getPortfolio function', function () {
            expect(_.isFunction(svc.getPortfolio)).toBeTruthy();
        });
    });

    describe('addStock', function () {
        var spy;

        beforeEach(function () {
            spy = spyOn(svc.portfolio, '$add');
            svc.portfolio.push({ symbol: 'AAPL' });
        });

        it('should have an addStock function', function () {
            expect(_.isFunction(svc.addStock)).toBeTruthy();
        });

        it('should do nothing if bad data is passed', function () {
            svc.addStock();
            svc.addStock('AAPL');
            svc.addStock({ ticker: 'GOOG' });
            svc.addStock({ symbol: 'AAPL' });
            expect(spy).not.toHaveBeenCalled();
        });

        it('should call the database if good data is passed', function () {
            svc.addStock({ symbol: 'GOOG' });
            expect(spy).toHaveBeenCalledWith({ symbol: 'GOOG', percentage: 0 });
        });
    });

    describe('saveStock', function () {
        it('should have an saveStock function', function () {
            expect(_.isFunction(svc.saveStock)).toBeTruthy();
        });
    });

    describe('deleteStock', function () {
        it('should have an deleteStock function', function () {
            expect(_.isFunction(svc.deleteStock)).toBeTruthy();
        });
    });

    describe('getUnusedPercentage', function () {
        it('should have an getUnusedPercentage function', function () {
            expect(_.isFunction(svc.getUnusedPercentage)).toBeTruthy();
        });
    });
});