Authentication.factory('AuthenticationService', function ($firebaseAuth) {
	var svc = this;

	var auth = new Firebase('https://realtimetrade.firebaseio.com');

	svc.logOut = function () {
		return $firebaseAuth(auth);
	};

	return svc;
});