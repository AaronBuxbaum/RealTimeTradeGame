//var glob = require('glob');

//var files = glob.sync('./node_modules/protractor/selenium/selenium-server-standalone-*.jar', { nodir: true });
exports.config = {
	//seleniumAddress: 'http://localhost:4444/wd/hub',
	//seleniumServerJar: files[0],
	specs: ['e2e-tests/**/*.spec.js'],

	sauceLabs: {
		testName: 'Web App Unit Tests',
		//tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
		username: process.env.SAUCE_USERNAME,
		accessKey: process.env.SAUCE_ACCESS_KEY,
		startConnect: false,
		connectOptions: {
			port: 5757,
			logfile: 'sauce_connect.log'
		}
	}
};