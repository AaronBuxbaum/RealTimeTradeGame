var Q = require('q');
var FirebaseTokenGenerator = require('firebase-token-generator');

function authenticate(ref, uid) {
	if (!process.env.FIREBASE_SECRET) {
		return;
	}

	var defer = Q.defer();
	var tokenGenerator = new FirebaseTokenGenerator(process.env.FIREBASE_SECRET);
	var token = tokenGenerator.createToken({ uid: uid });

	ref.authWithCustomToken(token,
		function (error) {
			if (!error) {
				defer.resolve();
			} else {
				defer.reject(error);
			}
		});

	return defer.promise;
}

module.exports.authenticate = authenticate;