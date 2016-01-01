describe('Portfolio', function () {
    var $scope, elem;

    beforeEach(module('Portfolio'));
    beforeEach(module('Templates'));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        elem = $compile('<portfolio></portfolio>')($scope);
        $scope.$digest();
    }));

    xdescribe('initialization', function () {
        it('creates the element', function () {
            expect(elem).toBeDefined();
        });
    });
});