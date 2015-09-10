module.exports = function (config) {
	config.set({
		autoWatch: false,
		basePath: '',
		browsers: ['PhantomJS'],
		colors: true,
		files: [
			'build/vendors.js',
			'src/**/*-module.js',
			'src/**/*.js'
		],
		frameworks: ['jasmine'],
		plugins: [
			'karma-jasmine',
			'karma-phantomjs-launcher'
		],
		reporters: ['progress'],
		singleRun: true
	});
};