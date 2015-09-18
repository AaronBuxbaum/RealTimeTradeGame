
angular.module('Authentication').factory('AuthenticationService', function ($firebaseAuth, $firebaseObject) {
	var svc = this;

	var ref = new Firebase('https://realtimetrade.firebaseio.com');
	svc.auth = $firebaseAuth(ref);

	//Get signed in user ID (or null if not signed in)
	svc.getUserID = function () {
		return svc.auth.$getAuth().uid;
	};
	
	//Watch for changes in the authentication state
	/*
	svc.auth.$onAuth(function(authData) {
		svc.isAuthenticated = !!authData;
	});
	*/

	//Log in
	svc.logIn = function (email, password) {
		return svc.auth.$authWithPassword({
            email: email,
            password: password
        })
			.then(function (response) {
				svc.profileImage = response.password.profileImageURL;
				return svc.profileImage;
			})

			.catch(function (error) {
				console.log(error);
				return error;
			});
	};

	//Sign up
	svc.signUp = function (email, password) {
		svc.auth.$createUser({
			email: email,
			password: password
		})
			.then(function (response) {
				var user = ref.child('users/' + response.uid);
				var newUser = $firebaseObject(user);
				newUser.uid = response.uid;
				newUser.name = response.uid;
				newUser.league = 1; //TODO: remove -- this is just for early convenience factor
				newUser.$save();
				return svc.logIn(email, password);
			})

			.catch(function (error) {
				console.log(error);
				return error;
			});
	};
	
	//Log out
	svc.logOut = function () {
		svc.auth.$unauth();
	};

	return svc;
});