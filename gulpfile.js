/* Dependencies */
var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var install = require('gulp-install');
var nodemon = require('gulp-nodemon');


/* Non-default tasks */
//Clean the build files
gulp.task('clean', function () {  
  return gulp.src(['public_html/vendors.js'], {read: false})
    .pipe(clean());
});

//Start server and watch for changes
gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    tasks: ['build'],
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});


/* Default tasks */
//Install bower and npm
gulp.task('install', function () {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(install());
});

//Concatenate vendor JS into one file
gulp.task('vendorJS', function() {
  var BOWER = 'bower_components/';
  return gulp.src([
      BOWER + 'angular/angular.js',
      BOWER + 'angular-animate/angular-animate.js',
      BOWER + 'angular-aria/angular-aria.js',
      BOWER + 'angular-material/angular-material.js',
      BOWER + 'jquery/dist/jquery.js',
      BOWER + 'lazy.js/lazy.js',
      BOWER + 'firebase/firebase-debug.js',
      BOWER + 'angularfire/dist/angularfire.js',
      BOWER + 'highstock-release/highstock.src.js',
      BOWER + 'highcharts-ng/dist/highcharts-ng.js'
  ])
    .pipe(concat('vendors.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('public_html'));
});

//Concatenate vendor CSS into one file
gulp.task('vendorCSS', function () {
  return gulp.src(['bower_components/angular-material/angular-material.css'])
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest('public_html'));
});

//Run less conversion
gulp.task('less', function () {
  return gulp.src('public_html/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('public_html'));
});


/* Task batchers */
gulp.task('build', ['install', 'vendorJS', 'vendorCSS', 'less']);
gulp.task('default', ['build', 'start']);