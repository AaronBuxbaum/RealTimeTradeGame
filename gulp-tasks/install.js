/* Dependencies */
var gulp = require('gulp');
var tsd = require('gulp-tsd');
var less = require('gulp-less');
var install = require('gulp-install');
var g = require('./global.json');

/* Install tasks */

//Install bower and npm
gulp.task('install', function () {
  return gulp.src(['../bower.json', '../package.json'])
    .pipe(install());
});

//Install typescript definitions
gulp.task('tsd', function () {
  return gulp.src('./gulp-tsd.json')
    .pipe(tsd());
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