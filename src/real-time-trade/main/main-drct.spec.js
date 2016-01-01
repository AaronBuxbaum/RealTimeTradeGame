describe('Main', function () {
    var $scope, elem;

    beforeEach(module('Main'));
    beforeEach(module('Templates'));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        elem = $compile('<main></main>')($scope);
        $scope.$digest();
    }));

    xdescribe('initialization', function () {
        it('creates the element', function () {
            expect(elem).toBeDefined();
        });
    });
});