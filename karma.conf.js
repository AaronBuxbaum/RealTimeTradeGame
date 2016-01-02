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
            'src/**/*-module.js',
            'src/**/*.js'
        ],
        frameworks: ['jasmine'],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-coveralls'
        ],
        reporters: ['progress', 'coverage', 'coveralls'],
        preprocessors: {
            'src/**/*.js': ['coverage']
        },
        singleRun: true,
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
        }
    });
};