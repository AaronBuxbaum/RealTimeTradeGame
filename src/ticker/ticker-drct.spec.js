describe('Ticker', function () {
    var $scope, elem;

    beforeEach(module('Ticker'));
    beforeEach(module('Templates'));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        elem = $compile('<ticker></ticker>')($scope);
        $scope.$digest();
    }));

    xdescribe('initialization', function () {
        it('creates the element', function () {
            expect(elem).toBeDefined();
        });
    });
});