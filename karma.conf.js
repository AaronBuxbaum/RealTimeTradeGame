module.exports = function (config) {
    config.set({
        autoWatch: false,
        basePath: '',
        browsers: ['PhantomJS'],
        colors: true,
        files: [
            'build/vendors.js',
            'build/templates.js',
            'build/app.js',
            'src/**/*.spec.js'
        ],
        frameworks: ['jasmine'],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader',
            'karma-coverage',
            'karma-coveralls'
        ],
        reporters: ['progress', 'coverage', 'coveralls'],
        preprocessors: {
            'build/app.js': ['sourcemap', 'coverage']
        },
        singleRun: true,
        coverageReporter: {
            type: 'text',
            dir: 'coverage/'
        }
    });
};