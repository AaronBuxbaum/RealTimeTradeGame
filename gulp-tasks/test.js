/* Dependencies */
var gulp = require('gulp');
var karma = require('karma');

//Run tests
gulp.task('test', function (done) {
	new karma.Server({
		configFile: __dirname + '/../karma.conf.js',
		singleRun: true
	}, done).start();
});