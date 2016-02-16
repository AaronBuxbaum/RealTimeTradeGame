module.exports = function (config) {
    config.set({
        autoWatch: false,
        basePath: '',
        browsers: ['PhantomJS'],
        colors: true,
        files: [
            'node_modules/mockfirebase/browser/mockfirebase.js',
            'build/vendors.js',
            'build/templates.js',
            'TEST/**/*-module.js',
            'TEST/**/*.js'
        ],
        frameworks: ['jasmine'],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-coveralls',
            'karma-sauce-launcher'
        ],
        reporters: ['dots', 'saucelabs', 'coverage', 'coveralls'],
        preprocessors: {
            'TEST/**/*.js': ['coverage']
        },
        singleRun: true,
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
        },
        sauceLabs: true,
        sauceUser: process.env.SAUCE_USERNAME,
        sauceKey: process.env.SAUCE_ACCESS_KEY,
    });
};