Authentication.factory('AuthenticationService', function ($firebaseAuth, $firebaseArray) {
	var svc = this;

	var ref = new Firebase('https://realtimetrade.firebaseio.com');
	svc.auth = $firebaseAuth(ref);

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
				//Is there a better way to connect user accounts and their own section of firebase data?
				$firebaseArray(ref.child('users')).$add(response);
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