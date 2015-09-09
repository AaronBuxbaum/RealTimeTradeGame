module.exports = function (config) {
	config.set({
		autoWatch: false,
		basePath: './src/',
		browsers: ['PhantomJS'],
		colors: true,
		files: [
			'../vendors.js',

			'about/about.js',
			'auth/auth.js',
			'auth/auth-fact.js',
			'create-league/create-league.js',
			'league/league.js',
			'loading/loading.js',
			'login/login.js',
			'logout/logout.js',
			'main/main.js',
			'portfolio/portfolio.js',
			'portfolio/add-new-stock/add-new-stock.js',
			'portfolio/stock-slider/stock-slider.js',
			'real-time-trade.js',
			'real-time-trade-ctrl.js',
			'ticker/ticker.js',
			'toolbar/toolbar.js',

			'**/*.spec.js'
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