module.exports = function (config) {
	config.set({
		autoWatch: false,
		basePath: './src/',
		browserify: {
			watch: false,
			debug: true
		},
		browsers: ['Chrome'],
		colors: true,
		files: [
			'../node_modules/angular/angular.js',
			'../node_modules/angular-animate/angular-animate.js',
			'../node_modules/angular-aria/angular-aria.js',
			'../node_modules/angular-material/angular-material.js',
			'../node_modules/angular-mocks/angular-mocks.js',
			'real-time-trade.js',
			'real-time-trade-ctrl.js',
			'real-time-trade-ctrl.spec.js',
			'**/*.js'
		],
		frameworks: ['browserify', 'jasmine'],
		preprocessors: {
			'**/*.spec.js': ['browserify']
		},
		reporters: ['progress'],
		singleRun: true
	});
};