  /*
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
  */