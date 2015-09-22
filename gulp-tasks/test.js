/* Dependencies */
var gulp = require('gulp');
var karma = require('karma');
var protractor = require('gulp-protractor');

gulp.task('test', ['unit-tests', 'e2e-tests']);

gulp.task('unit-tests', function (done) {
	new karma.Server({
		configFile: __dirname + '/../karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('e2e-tests', function () {
	return gulp.src(['./e2e-tests/**/*.js'])
		.pipe(protractor.protractor({
			'configFile': 'protractor.conf.js'
		}));
});