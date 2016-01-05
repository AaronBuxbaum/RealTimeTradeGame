describe('ChartService', function () {
    var svc, $q, $rootScope;

    beforeEach(function () {
        module('RealTimeTrade.Chart');
    });

    beforeEach(inject(function (_ChartService_, _$q_, _$rootScope_) {
        svc = _ChartService_;
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));
});