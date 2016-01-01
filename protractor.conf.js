exports.config = {
    capabilities: {
        'browserName': 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'Radian build #{process.env.TRAVIS_BUILD_NUMBER}'
    },
    framework: 'jasmine',
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    specs: ['e2e-tests/**/*.spec.js'],
    onPrepare: function () {
        /*
            var dir,
                wrench;

            require('jasmine-reporters');

            wrench = require('wrench');
            dir = 'test/report/protractor/';
            global.select = global.by;

            wrench.mkdirSyncRecursive(dir);
            jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(dir, true, true));
        */

        //browser.driver.get(browser.baseUrl);
    }
};