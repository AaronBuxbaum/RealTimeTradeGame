/**
* @ngdoc controller
* @name Ticker.controller:TickerCtrl
*
* @description
*
* @requires $http
* @requires AuthenticationService
**/
angular.module('Ticker').controller('TickerCtrl', function ($http, AuthenticationService) {
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
    $http.get('json.js').then(function (json) {
      var chartOptions = json.data['chart-options'];
      chartOptions.chart.renderTo = $('#stockTicker')[0];
      ctrl.chart = new Highcharts.StockChart(chartOptions);
    
      //Show loading text
      ctrl.chart.showLoading();
	  
      //Throttle the render function
      ctrl.renderChart = _.throttle(ctrl.chart.redraw, 5000);
    });

  };
  ctrl.createChart();
        
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