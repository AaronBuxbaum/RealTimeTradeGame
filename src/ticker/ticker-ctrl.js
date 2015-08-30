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
                chart: {
                    zoomType: 'x'
                },
                rangeSelector: {
                    buttons: [
                        {
                            type: 'day',
                            count: 1,
                            text: 'Real Time',
                            dataGrouping: {
                                units: [['seconds', [1]]]
                            }
                        }, {
                            type: 'month',
                            count: 1,
                            text: 'Hour',
                            dataGrouping: {
                                units: [['minutes', [1]]]
                            }
                        }, {
                            type: 'month',
                            count: 3,
                            text: 'Day',
                            dataGrouping: {
                                units: [['day', [1]]]
                            }
                        }, {
                            type: 'year',
                            count: 1,
                            text: 'Week',
                            dataGrouping: {
                                units: [['week', [1]]]
                            }
                        }, {
                            type: 'all',
                            text: 'Month',
                            dataGrouping: {
                                units: [['month', [1]]]
                            }
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