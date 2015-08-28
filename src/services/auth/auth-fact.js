Authentication.factory('AuthenticationService', function ($firebaseAuth) {
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
				//create an entry in the database for the new user's data to be stored in
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