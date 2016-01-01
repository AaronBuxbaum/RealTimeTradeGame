describe('Portfolio', function () {
    var $scope, elem;

    beforeEach(module('Portfolio'));
    beforeEach(module('Templates'));

    beforeEach(inject(function ($compile, $rootScope, $httpBackend, AuthenticationService) {
        AuthenticationService.auth.data = {
            uid: 'AAA'
        };
        spyOn(AuthenticationService, 'getUserID').and.returnValue(0);

        $httpBackend.whenGET('json.js').respond({
            'chart-options': {
                'chart': {}
            }
        });

        $scope = $rootScope.$new();
        elem = $compile('<portfolio></portfolio>')($scope);
        $scope.$digest();
    }));

    describe('initialization', function () {
        it('creates the element', function () {
            expect(elem).toBeDefined();
        });
    });
});