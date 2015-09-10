var Q = require('q');
var FirebaseTokenGenerator = require('firebase-token-generator');

var tokenGenerator = new FirebaseTokenGenerator(process.env.FIREBASE_SECRET || '');
var token = tokenGenerator.createToken({ uid: '1' });

function authenticate(ref) {
	var defer = Q.defer();

	ref.authWithCustomToken(token,
		function (error) {
			if (!error) {
				defer.resolve();
			} else {
				defer.reject(error);
			}
		}, {
			admin: true,
			remember: 'none'
		});

	return defer.promise;
}

module.exports.authenticate = authenticate;