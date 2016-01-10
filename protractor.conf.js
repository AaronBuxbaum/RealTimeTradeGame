exports.config = {
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,
    capabilities: {
        'browserName': 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'Build #' + process.env.TRAVIS_BUILD_NUMBER
    },
    framework: 'jasmine',
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    specs: ['e2e-tests/**/*.spec.js'],
    onPrepare: function () {
        var proxyquire = require('proxyquire');
        var MockFirebase = require('mockfirebase').MockFirebase;
        var mock;
        proxyquire('RealTimeTradeGame', {
            firebase: function (url) {
                return (mock = new MockFirebase(url));
            }
        });
        mock.flush();
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
    }
};