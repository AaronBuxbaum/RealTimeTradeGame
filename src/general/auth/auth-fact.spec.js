describe('AuthenticationService', function () {
    var svc;

    beforeEach(function () {
        module('Authentication');
    });

    beforeEach(inject(function (_AuthenticationService_) {
        svc = _AuthenticationService_;
    }));

    describe('getUserID', function () {
        it('has a getUserID function', function () {
            expect(_.isFunction(svc.getUserID)).toBeTruthy();
        });
    });

    describe('logIn', function () {
        it('has a logIn function', function () {
            expect(_.isFunction(svc.logIn)).toBeTruthy();
        });
    });

    describe('signUp', function () {
        it('has a signUp function', function () {
            expect(_.isFunction(svc.signUp)).toBeTruthy();
        });
    });

    describe('logOut', function () {
        it('has a logOut function', function () {
            expect(_.isFunction(svc.logOut)).toBeTruthy();
        });
    });
});