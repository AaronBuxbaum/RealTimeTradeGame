describe('Logout', function () {
    var $scope, elem;

    beforeEach(module('RealTimeTrade.Logout', 'Templates'));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        elem = $compile('<logout></logout>')($scope);
        $scope.$digest();
    }));

    describe('initialization', function () {
        it('creates the element', function () {
            expect(elem).toBeDefined();
        });
    });
});