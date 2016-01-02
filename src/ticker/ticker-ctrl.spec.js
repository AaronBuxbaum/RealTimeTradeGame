describe('TickerCtrl', function () {
    var ctrl, createController, $httpBackend;

    beforeEach(function () {
        module('mock.firebase', 'RealTimeTrade.Ticker');
    });

    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, AuthenticationService) {
        $httpBackend = _$httpBackend_;

        createController = function () {
            ctrl = $controller('TickerCtrl', { $scope: $rootScope.$new() });
            $httpBackend.flush();
            ctrl.ref.flush();
        };

        Highcharts.StockChart = function () {
            return {
                showLoading: function () { },
                hideLoading: function () { },
                redraw: function () { },
                addSeries: function () {
                    return {
                        setData: function () { },
                        addPoint: function () { }
                    }
                },
                drawSeries: function () { }
            }
        };

        AuthenticationService.auth.data = {
            uid: 'AAAAA'
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
            $httpBackend.expectGET('json.js');
        });

        it('creates the chart', function () {
            createController();
            expect(_.isObject(ctrl.chart)).toBeTruthy();
        });
    });

    describe('updating', function () {
        it('it updates when new children are added', function () {
            createController();
            spyOn(ctrl, 'renderChart');
            ctrl.ref.push({ TEST: 'HELLO' });
            ctrl.ref.flush();
            expect(ctrl.renderChart).toHaveBeenCalled();
        });
    });
});