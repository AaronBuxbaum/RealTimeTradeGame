var Q = require('q');
var FirebaseTokenGenerator = require('firebase-token-generator');

function authenticate(ref, uid) {
	var defer = Q.defer();

	if (!process.env.FIREBASE_SECRET) {
		defer.reject();
	}

	else {
		var tokenGenerator = new FirebaseTokenGenerator(process.env.FIREBASE_SECRET);
		var token = tokenGenerator.createToken({ uid: uid });

		ref.authWithCustomToken(token,
			function (error) {
				if (!error) {
					defer.resolve();
				} else {
					console.error(error);
					defer.reject(error);
				}
			});
	}

	return defer.promise;
}

module.exports.authenticate = authenticate;