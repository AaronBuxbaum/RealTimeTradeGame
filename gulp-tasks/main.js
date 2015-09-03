/* Dependencies */
var gulp = require('gulp');
var runSequence = require('run-sequence');

/* Main tasks */
//gulp.task('build', ['install', 'vendorJS', 'vendorCSS', 'concat-modules', 'copy-files', 'less']);
//gulp.task('heroku:product', ['install', 'server']);
gulp.task('clean', ['clean-npm', 'clean-build', 'clean-typings']);
gulp.task('build', ['install-npm', 'install-tsd', 'concat-vendor-js', 'concat-vendor-css']);
gulp.task('default', ['server']);

gulp.task('deploy', function (callback) {
	runSequence('install-npm', ['concat-vendor-js', 'concat-vendor-css'], 'server', callback);
});