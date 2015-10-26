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
      'node_modules/bardjs/dist/bard.js',
			'src/**/*.spec.js'
		],
		frameworks: ['jasmine', 'sinon'],
		plugins: [
			'karma-jasmine',
			'karma-phantomjs-launcher',
			'karma-coverage'
		],
		preprocessors: {
			'build/app.js': 'coverage'
		},
		reporters: ['progress', 'coverage'],
		singleRun: true
	});
};
