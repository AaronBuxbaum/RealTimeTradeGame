League.factory('LeagueService', function (AuthenticationService, $firebaseObject, $firebaseArray) {
	var svc = this;

	var ref = new Firebase('https://realtimetrade.firebaseio.com');
	var leagueRef = ref.child('leagues');
	svc.leagues = $firebaseArray(leagueRef);

	svc.joinLeague = function (leagueID, uid) {
		if (leagueID && uid) {
			var league = _.find(svc.leagues, { id: leagueID });
			if (league && _.indexOf(league.users, uid) < 0) {
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

	return svc;
});