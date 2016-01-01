describe('TickerCtrl', function () {
    var ctrl, createController, $httpBackend;

    beforeEach(function () {
        module('Ticker');
    });

    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, AuthenticationService) {
        $httpBackend = _$httpBackend_;

        createController = function () {
            ctrl = $controller('TickerCtrl', { $scope: $rootScope.$new() });
        };

        Highcharts.StockChart = function () { return {
            showLoading: function () {},
            redraw: function () {}
        } };

        AuthenticationService.auth.data = {
            uid: 'AAA'
        };
        
        $httpBackend.whenGET('json.js').respond({
            'chart-options': {
                'chart': {}
            }
        });
    }));

    describe('initialize', function () {
        it('sets up the chart', function () {
            createController();
            $httpBackend.flush();
            $httpBackend.expectGET('json.js');
        });
        
        it('creates the chart', function () {
            createController();
            $httpBackend.flush();
            expect(_.isObject(ctrl.chart)).toBeTruthy();
        });
    });
});