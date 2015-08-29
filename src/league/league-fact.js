League.factory('LeagueService', function (AuthenticationService, $firebaseObject, $firebaseArray) {
	var svc = this;

	var ref = new Firebase('https://realtimetrade.firebaseio.com');
	var leagueRef = ref.child('leagues');
	svc.leagues = $firebaseArray(leagueRef);

	svc.joinLeague = function (leagueID, uid) {
		if (leagueID && uid) {
			var league = _.find(svc.leagues, { id: leagueID });
			if (league && !_.contains(league.users, uid)) {
				if (!league.users) {
					league.users = [];
				}

				var user = $firebaseObject(ref.child('users').child(uid));
				user.$loaded().then(function (data) {
					data.league = leagueID;
					user.$save();
				});

				league.users.push(uid);
				svc.leagues.$save(league);
			}
		}
	};

	svc.createLeague = function (id, name) {
		svc.leagues.$add({
			id: id,
			name: name,
			users: []
		});
	};

	svc.leaveLeague = function (uid) {
		var user = $firebaseObject(ref.child('users').child(uid));
		user.$loaded().then(function (data) {
			var leagueID = _.cloneDeep(user.league);
			data.league = null;
			data.$save();

			var leagues = $firebaseArray(ref.child('leagues'));
			leagues.$loaded().then(function (data) {
				var leagueFind = _.find(data, { id: leagueID });

				if (leagueFind) {
					var index = _.indexOf(leagueFind.users, uid);
					leagueFind.users.splice(index, 1);
					data.$save(leagueFind.users);
				}
			});
		});
	};

	return svc;
});