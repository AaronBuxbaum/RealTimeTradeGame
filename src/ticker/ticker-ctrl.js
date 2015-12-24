/**
* @ngdoc controller
* @name Ticker.controller:TickerCtrl
*
* @description
*
* @requires $q
* @requires $http
* @requires AuthenticationService
**/
angular.module('Ticker').controller('TickerCtrl', function ($q, $http, AuthenticationService) {
  var ctrl = this;
  var auth = AuthenticationService.auth.data;
  var ref = new Firebase('https://realtimetrade.firebaseio.com');

  //Get lines for each player in active league
  $http.get('json.js')
    .then(setUpChart)
    .then(ref.child('users').child(auth.uid).once('value', findActiveLeague));

  //Set up the chart
  function setUpChart(json) {
    var chartOptions = json.data['chart-options'];
    chartOptions.chart.renderTo = $('#stockTicker')[0];
    ctrl.chart = new Highcharts.StockChart(chartOptions);
    ctrl.renderChart = _.debounce(ctrl.chart.redraw, 10000);
    return $q.when();
  }

  //Find the active league for the active user
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

  //Render changes to the stock grid
  function renderUsers(leagueUser, i) {
    ref.child('users').child(leagueUser.toString()).once('value', function (userRef) {
      var user = userRef.val();

      ref.child('series').child(user.uid).orderByChild('0').once('value', function (series) {
        var line = ctrl.chart.addSeries(user);

        //Set initial data
        var data = [];
        series.forEach(function (value) {
          data.push(value.val());
        });
        line.setData(data, false);
          
        //Update lines as new values come in
        series.ref().limitToLast(1).on('child_added', function (point) {
          line.addPoint(point.val(), false);
          ctrl.renderChart();
        });
      });
    });
  }
});