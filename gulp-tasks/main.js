var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function (callback) {
	runSequence('install', 'concat', callback);
});

gulp.task('deploy', function (callback) {
	runSequence('build', 'server', 'portfolioUpdater', callback);
});

gulp.task('debug', ['docs', 'lint', 'test']);
gulp.task('develop', ['watch', 'server']);
gulp.task('default', ['server']);