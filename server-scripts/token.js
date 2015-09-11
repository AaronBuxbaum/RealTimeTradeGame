var Q = require('q');
var FirebaseTokenGenerator = require('firebase-token-generator');
var tokenGenerator = new FirebaseTokenGenerator(process.env.FIREBASE_SECRET || '');

function authenticate(ref, uid) {
	var defer = Q.defer();

	ref.authWithCustomToken(createToken(uid),
		function (error) {
			if (!error) {
				defer.resolve();
			} else {
				defer.reject(error);
			}
		}, {
			remember: 'none'
		});

	return defer.promise;
}

function createToken (uid) {
	return tokenGenerator.createToken({ uid: uid });
}

module.exports.authenticate = authenticate;