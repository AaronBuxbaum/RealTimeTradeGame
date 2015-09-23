var glob = require('glob');

var files = glob.sync('./node_modules/protractor/selenium/selenium-server-standalone-*.jar', { nodir: true });
exports.config = {
	//seleniumAddress: 'http://localhost:4444/wd/hub',
	seleniumServerJar: files[0],
	specs: ['e2e-tests/**/*.spec.js']
};