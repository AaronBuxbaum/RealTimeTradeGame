/**
* @ngdoc controller
* @name Ticker.controller:TickerCtrl
*
* @description
*
* @requires $timeout
* @requires AuthenticationService
**/
angular.module('Ticker').controller('TickerCtrl', function ($timeout, AuthenticationService) {
  var ctrl = this;
  var auth = AuthenticationService.auth.data;
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
        ]
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
    
    //Show loading text
    ctrl.chart.showLoading();
	  
    //Throttle the render function
    ctrl.renderChart = _.throttle(ctrl.chart.redraw, 5000);
  };
  $timeout(ctrl.createChart, 0);
        
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

      //Get data for each user
      _.forEach(findLeague.users, function (leagueUser, i) {
        ref.child('users').child(leagueUser.toString()).once('value', function (userRef) {
          var user = userRef.val();
          
          //Get the initial values
          ref.child('series').child(user.uid).orderByChild('0').once('value', function (series) {
            user.data = _.toArray(series.val());
            user.id = user.uid;
            var line = ctrl.chart.addSeries(user);
              
            //Update lines as new values come in
            series.ref().on('child_added', function (point) {
              if (line) {
                line.addPoint(point.val(), false);
                ctrl.renderChart();
              }
            });

            //Click the range selector button
            ctrl.chart.rangeSelector.clickButton(2, ctrl.chart.rangeSelector.buttonOptions[0], false);
            
            //Hide the loading text
            if (i === findLeague.users.length - 1) {
              ctrl.chart.hideLoading();
            }
          });
        });
      });
    });
  });
});