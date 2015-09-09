/* Dependencies */
var gulp = require('gulp');
var runSequence = require('run-sequence');

/* Main tasks */
gulp.task('build', ['install', 'concat-vendor-js', 'concat-vendor-css']);
gulp.task('default', ['server']);

gulp.task('deploy', function (callback) {
	runSequence(['install-npm', 'install-bower'], ['concat-vendor-js', 'concat-vendor-css'], 'server', callback);
	//['concat-modules', 'copy-files', 'less']);
});