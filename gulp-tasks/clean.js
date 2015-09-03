/* Dependencies */
var gulp = require('gulp');
var rimraf = require('rimraf');
var g = require('./global.json');

/* Clean tasks */

//Clean the node_modules directory
gulp.task('clean-npm', function () {
  return rimraf(g.NPM);
});

//Clean the build directory
gulp.task('clean-build', function () {
  return rimraf(g.BUILD);
});

//Clean the typings directory
gulp.task('clean-typings', function () {
  return rimraf(g.TYPINGS);
});