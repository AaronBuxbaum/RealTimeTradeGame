/* Dependencies */
var gulp = require('gulp');
var runSequence = require('run-sequence');

/* Main tasks */
gulp.task('build', function (callback) {
	runSequence('install', 'concat', callback);
});

gulp.task('deploy', function (callback) {
	runSequence('build', 'server', callback);
});

gulp.task('develop', function (callback) {
	runSequence('install-tsd', 'deploy', 'watch', callback);
});

gulp.task('default', ['server']);