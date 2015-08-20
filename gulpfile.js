/* Dependencies */
var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var install = require('gulp-install');
var server = require('gulp-express');


/* Global variables */
var SRC = 'src/';
var BOWER = 'bower_components/';
var BUILD = 'build/';
var MODULES = ['ticker', 'database'];


/* Non-default tasks */
//Clean the build files
gulp.task('clean', function () {
  return gulp.src(BUILD, { read: false })
    .pipe(clean());
});

gulp.task('server', function () {
  server.run(['server.js']);
});


/* Default tasks */
//Install bower and npm
gulp.task('install', function () {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(install());
});

//Concatenate vendor JS into one file
gulp.task('vendorJS', function () {
  return gulp.src([
    BOWER + 'angular/angular.js',
    BOWER + 'angular-animate/angular-animate.js',
    BOWER + 'angular-aria/angular-aria.js',
    BOWER + 'angular-material/angular-material.js',
    BOWER + 'jquery/dist/jquery.js',
    BOWER + 'lodash/lodash.js',
    BOWER + 'firebase/firebase-debug.js',
    BOWER + 'angularfire/dist/angularfire.js',
    BOWER + 'highstock-release/highstock.src.js',
    BOWER + 'highcharts-ng/dist/highcharts-ng.js'
  ])
    .pipe(concat('vendors.js'))
  //.pipe(uglify())
    .pipe(gulp.dest(BUILD));
});

//Concatenate vendor CSS into one file
gulp.task('vendorCSS', function () {
  return gulp.src([BOWER + 'angular-material/angular-material.css'])
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest(BUILD));
});

//Concatenate modules into one file
gulp.task('concat-modules', function () {
  MODULES.forEach(function (module) {
    gulp.src([
      SRC + module + '/' + module + '.js',
      SRC + module + '/' + '*.js'
    ])
      .pipe(concat(module + '.js'))
      .pipe(gulp.dest(BUILD + module));

    gulp.src([SRC + module + '/*.html'])
      .pipe(gulp.dest(BUILD + module));
  });
});

//Copy files that don't need to be compiled
gulp.task('copy-files', function () {
  return gulp.src([SRC + 'index.html', SRC + 'config.js'])
    .pipe(gulp.dest(BUILD));
});

//Run less conversion
gulp.task('less', function () {
  return gulp.src(SRC + '**/*.less')
    .pipe(less())
    .pipe(gulp.dest(BUILD));
});


/* Task batchers */
//gulp.task('build', ['install', 'vendorJS', 'vendorCSS', 'concat-modules', 'copy-files', 'less']);
gulp.task('build', ['vendorJS', 'vendorCSS']);
gulp.task('default', ['server']);
