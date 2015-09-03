/* Dependencies */
var gulp = require('gulp');
var del = require('del');
var g = require('./global.json');

/* Clean tasks */

//Clean the node_modules directory
gulp.task('clean-npm', function () {
  return del(g.NPM);
});

//Clean the build directory
gulp.task('clean-build', function () {
  return del(g.BUILD);
});

//Clean the typings directory
gulp.task('clean-typings', function () {
  return del(g.TYPINGS);
});