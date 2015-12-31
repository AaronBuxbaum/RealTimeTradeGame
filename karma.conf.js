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
			'karma-coverage'
		],
		preprocessors: {
			'src': 'coverage'
		},
		reporters: ['progress', 'coverage', 'coveralls'],
		singleRun: true,
		coverageReporter: {
			type: 'lcov',
			dir: 'coverage/'
		}
	});
};