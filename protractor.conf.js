exports.config = {
    capabilities: {
        'browserName': 'chrome'
    },
    baseUrl: 'http://' + (process.env.SAUCE_USERNAME ? 'myself' : 'localhost') + ':' + (process.env.PORT || 8080),
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    specs: ['e2e-tests/**/*.spec.js'],
    onPrepare: function () {
        browser.driver.get(browser.baseUrl);
    }
};