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
    function setUpChart(json) {
      var chartOptions = json.data['chart-options'];
      chartOptions.chart.renderTo = $('#stockTicker')[0];
      ctrl.chart = new Highcharts.StockChart(chartOptions);
	  
      //Debounce the render function
      ctrl.renderChart = _.debounce(ctrl.chart.redraw, 1000);
    }

    $http.get('json.js').then(setUpChart);
  };
  ctrl.createChart();

  //Get lines for each player in active league
  ctrl.lines = [];
  ref.child('users').child(auth.uid).once('value', findActiveLeague);

  function findActiveLeague(activeUser) {
    if (!activeUser.val() || !activeUser.val().league) {
      return;
    }

    ref.child('leagues').once('value', function (leagues) {
      var findLeague = _.find(leagues.val(), { id: activeUser.val().league });
      if (!findLeague) {
        return;
      }

      if (findLeague.endTime) {
        ctrl.endTime = findLeague.endTime;
      }

      _.forEach(findLeague.users, renderUsers);
    });
  }

  function renderUsers(leagueUser, i) {
    ref.child('users').child(leagueUser.toString()).once('value', function (userRef) {
      var user = userRef.val();

      ref.child('series').child(user.uid).orderByChild('0').once('value', function (series) {
        var line = ctrl.chart.addSeries(user);
            
        //Update lines as new values come in
        series.ref().on('child_added', function (point) {
          line.addPoint(point.val(), false);
          ctrl.renderChart();
        });
      });
    });
  }
});