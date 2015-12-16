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

  //TODO: this shouldn't only happen when the authorization status changes (ie. if people join or leave a league?)
  AuthenticationService.auth.$onAuth(function (auth) {
    if (!auth) {
      return;
    }

    var ref = new Firebase('https://realtimetrade.firebaseio.com');

    //Create the chart
    ctrl.createChart = function () {
      //Set global timezone to EST
      Highcharts.setOptions({
        global: {
          timezoneOffset: 5 * 60
        }
      });

      //Set up the chart
      ctrl.chart = new Highcharts.StockChart({
        animation: false,
        chart: {
          renderTo: $('#stockTicker')[0],
          height: 400,
          animation: false,
          reflow: false,
          zoomType: 'x'
        },
        legend: {
          enabled: true
        },
        credits: {
          enabled: false
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
          ],
          selected: 3
        },
        yAxis: {
          title: {
            text: 'Portfolio Value ($)'
          }
        },
        tooltip: {
          valueDecimals: 2,
          valuePrefix: '$'
        },
        series: [],
        title: {
          text: 'Testing'
        },
        navigator: {
          enabled: true,
          loading: true,
          adaptToUpdatedData: false
        },
        enableMouseTracking: false
      });
      ctrl.chart.showLoading();
    };
    ctrl.createChart();

    //Throttle the render function
    ctrl.renderChart = _.throttle(ctrl.chart.redraw, 5000);
        
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

        _.forEach(findLeague.users, function (leagueUser, i) {
          ref.child('users').child(leagueUser.toString()).once('value', function (user) {
            var tmp = user.val();

            //Update lines as new values come in
            ref.child('series').child(tmp.uid).on('child_added', function (data) {
              var line = ctrl.chart.get(tmp.uid);
              if (line) {
                line.addPoint(data.val(), false);
                ctrl.renderChart();
              }
            });

            //Get the initial values
            ref.child('series').child(tmp.uid).orderByChild('0').once('value', function (data) {
              tmp.data = _.toArray(data.val());
              tmp.id = tmp.uid;
              ctrl.chart.addSeries(tmp);
              if (i === findLeague.users.length - 1) {
                ctrl.chart.rangeSelector.clickButton(3);
                ctrl.chart.hideLoading();
              }
            });
          });
        });
      });
    });
  });
});