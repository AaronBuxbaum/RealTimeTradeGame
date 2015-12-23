//var glob = require('glob');

//var files = glob.sync('./node_modules/protractor/selenium/selenium-server-standalone-*.jar', { nodir: true });
exports.config = {
  capabilities: {
    'browserName': 'chrome'
  },

  //directConnect: true,
  
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: files[0],

  specs: ['e2e-tests/**/*.spec.js'],
  /*
  sauceLabs: {
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    startConnect: false
  }
  */
};