describe('CreateLeagueCtrl', function () {
    var ctrl;

    beforeEach(function () {
        module('CreateLeague');
    });

    beforeEach(inject(function ($controller, $rootScope) {
        ctrl = $controller('CreateLeagueCtrl', {
            $scope: $rootScope.$new()
        });
    }));

    describe('updateMinBid', function () {
        var msPerDay = 86400000;

        it('returns the minimum bid as $1.50 times the number of days', function () {
            ctrl.startDate = Date.now();
            ctrl.closeDate = Date.now() + msPerDay * 2;
            ctrl.updateMinBid();
            expect(ctrl.minBid).toEqual(3);
        });

        it('returns 0 if the closing date is before the starting date', function () {
            ctrl.startDate = Date.now() + msPerDay * 2;
            ctrl.closeDate = Date.now();
            ctrl.updateMinBid();
            expect(ctrl.minBid).toEqual(0);
        });
    });

    describe('totalWinnings', function () {
        it('returns the total winnings for minimum bids', function () {
            ctrl.minBid = 4;
            ctrl.maxPlayers = 8;
            expect(ctrl.totalWinnings()).toEqual(30.4);
        });

        it('returns the total winnings for a higher bid', function () {
            ctrl.minBid = 3;
            ctrl.bid = 5;
            ctrl.maxPlayers = 8;
            expect(ctrl.totalWinnings()).toEqual(38);
        });

        it('gives the minimum bid if the bid is smaller than the minimum bid', function () {
            ctrl.minBid = 5;
            ctrl.bid = 4;
            ctrl.maxPlayers = 8;
            expect(ctrl.totalWinnings()).toEqual(38);
        });
    });
});