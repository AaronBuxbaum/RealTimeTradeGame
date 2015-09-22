var gulp = require('gulp');
var portfolioUpdater = require('../server-scripts/portfolio-updater.js');

gulp.task('portfolioUpdater', function () {
	return portfolioUpdater.initialize();
});