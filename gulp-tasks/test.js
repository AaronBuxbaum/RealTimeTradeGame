/* Dependencies */
var gulp = require('gulp');
var Server = require('karma').Server;

//Run tests
gulp.task('test', function (done) {
	new Server({
		configFile: __dirname + '/../karma.conf.js',
		singleRun: true
	}, done).start();
});