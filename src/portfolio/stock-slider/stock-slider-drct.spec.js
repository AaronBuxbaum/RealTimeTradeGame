describe('StockSlider', function () {
    var $scope, elem;

    beforeEach(module('RealTimeTrade.StockSlider', 'Templates'));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        elem = $compile('<stock-slider name="TEST" percentage="50"></stock-slider>')($scope);
        $scope.$digest();
    }));

    describe('initialization', function () {
        it('creates the element', function () {
            expect(elem).toBeDefined();
        });
    });
});