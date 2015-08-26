/* Dependencies */
var gulp = require('gulp');
var requireDir = require('require-dir')();
var runSequence = require('run-sequence');

/* Task batchers */
//gulp.task('build', ['install', 'vendorJS', 'vendorCSS', 'concat-modules', 'copy-files', 'less']);
//gulp.task('heroku:product', ['install', 'server']);
gulp.task('clean', ['clean-build', 'clean-typings']);
gulp.task('build', ['install', 'concat-vendor-js', 'concat-vendor-css', 'tsd']);
gulp.task('default', ['server']);

gulp.task('deploy', function (callback) {
	runSequence('install', ['concat-vendor-js', 'concat-vendor-css', 'tsd'], 'server', callback);
});