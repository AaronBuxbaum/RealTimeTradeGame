Ticker.controller('TickerCtrl', function ($firebaseArray, AuthenticationService) {
    var ctrl = this;

    //TODO this shouldn't only happen when the authorization status changes (ie. if people join or leave a league?)
    AuthenticationService.auth.$onAuth(function (auth) {
        if (!auth) {
            return;
        }

        var ref = new Firebase('https://realtimetrade.firebaseio.com');
        
        //Get lines for each player in active league
        ctrl.lines = [];
        ref.child('users/' + auth.uid).once('value', function (activeUser) {
            if (!activeUser.val() || !activeUser.val().league) {
                return;
            }

            var activeUserLeague = activeUser.val().league;
            ref.child('leagues').once('value', function (leagues) {
                var findLeague = _.find(leagues.val(), { id: activeUserLeague });
                if (!findLeague) {
                    return;
                }

                if (findLeague.endTime) {
                    ctrl.endTime = findLeague.endTime;
                }

                _.forEach(findLeague.users, function (leagueUser) {
                    ref.child('users').child(leagueUser.toString()).once('value', function (user) {
                        var tmp = user.val();
                        tmp.data = $firebaseArray(ref.child('series').child(tmp.uid));
                        ctrl.lines.push(tmp);
                    });
                });
            });
        });
        
        //Chart configuration
        ctrl.chartConfig = {
            options: {
                legend: {
                    enabled: true
                },
                chart: {
                    zoomType: 'x'
                },
                rangeSelector: {
                    buttons: [
                        {
                            type: 'minute',
                            count: 1,
                            text: 'm'
                        }, {
                            type: 'hour',
                            count: 1,
                            text: 'h'
                        }, {
                            type: 'hour',
                            count: 8,
                            text: 'd'
                        }, {
                            type: 'day',
                            count: 5,
                            text: 'w'
                        }, {
                            type: 'all',
                            count: 1,
                            text: 'all'
                        }
                    ]
                },
                navigator: {
                    enabled: true
                }
            },
            series: ctrl.lines,
            title: {
                text: 'Testing'
            },
            useHighStocks: true
        };
    });
});