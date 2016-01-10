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
        var disableNgAnimate = function () {
            angular.module('disableNgAnimate', []).run(['$animate', function ($animate) {
                $animate.enabled(false);
            }]);
        };
        browser.addMockModule('disableNgAnimate', disableNgAnimate);

        browser.get('http://localhost:8000');

        element(by.model('ctrl.email')).sendKeys('a@a.com');
        element(by.model('ctrl.password')).sendKeys('a');
        element(by.buttonText('Log In')).click();

        var dialog = element(by.tagName('md-dialog'));
        return browser.driver.wait(function () {
            return dialog.isPresent().then(function (present) {
                return !present;
            });
        }, 10000);
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
    }
};