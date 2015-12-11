/**
* @ngdoc controller
* @name Ticker.controller:TickerCtrl
*
* @description
*
* @requires $firebaseArray
* @requires AuthenticationService
**/
angular.module('Ticker').controller('TickerCtrl', function ($firebaseArray, AuthenticationService) {
  var ctrl = this;

  //TODO this shouldn't only happen when the authorization status changes (ie. if people join or leave a league?)
  AuthenticationService.auth.$onAuth(function (auth) {
    if (!auth) {
      return;
    }

    var ref = new Firebase('https://realtimetrade.firebaseio.com');
        
    //Get lines for each player in active league
    ctrl.lines = [];
    ref.child('users').child(auth.uid).once('value', function (activeUser) {
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
            ref.child('series').child(tmp.uid).on('child_added', function (data) {
              var line = _.find(ctrl.lines, { uid: tmp.uid });
              if (line && line.data) {
                var i = _.findLastIndex(line.data, function (elem) {
                  return elem[0] <= data.val()[0];
                });

                line.data.splice(i, 0, data.val());
              }
            });

            ref.child('series').child(tmp.uid).once('value', function (data) {
              //tmp.pointInterval = 1000*60*60;
              tmp.dataGrouping = {
                enabled: false
              };
              tmp.data = _.toArray(data.val());
              ctrl.lines.push(tmp);
            });
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
        credits: {
          enabled: false
        },
        chart: {
          animation: false,
          zoomType: 'x'
        },
        rangeSelector: {
          buttons: [
            {
              type: 'minute',
              count: 5,
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
          enabled: true,
          loading: true,
          adaptToUpdatedData: false
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