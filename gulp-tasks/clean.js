/* Dependencies */
var gulp = require('gulp');
var clean = require('gulp-clean');
var g = require('./global.json');

/* Clean tasks */

//Clean the node_modules directory
gulp.task('clean-npm', function () {
  return gulp.src(g.NPM, { read: false })
    .pipe(clean({ force: true }));
});

//Clean the build directory
gulp.task('clean-build', function () {
  return gulp.src(g.BUILD, { read: false })
    .pipe(clean({ force: true }));
});

//Clean the typings directory
gulp.task('clean-typings', function () {
  return gulp.src(g.TYPINGS, { read: false })
    .pipe(clean({ force: true }));
});