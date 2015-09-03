/* Dependencies */
var gulp = require('gulp');
var less = require('gulp-less');
var install = require('gulp-install');
var g = require('./global.json');

/* Install tasks */

//Install npm packages
gulp.task('install-npm', function () {
  return gulp.src('package.json')
    .pipe(install());
});

//Install Typescript typings (for Visual Studio)
gulp.task('install-tsd', function () {
  return gulp.src('tsd.json')
    .pipe(install());
});

//Copy files that don't need to be compiled
gulp.task('copy-files', function () {
  return gulp.src([g.SRC + 'index.html', g.SRC + 'config.js'])
    .pipe(gulp.dest(g.BUILD));
});

//Run less conversion
gulp.task('less', function () {
  return gulp.src(g.SRC + '**/*.less')
    .pipe(less())
    .pipe(gulp.dest(g.BUILD));
});