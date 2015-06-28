/* Dependencies */
var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var install = require('gulp-install');
var nodemon = require('gulp-nodemon');


/* Global variables */
var BASE = 'public_html/';
var BOWER = 'bower_components/';
var BUILD = BASE + 'build/';


/* Non-default tasks */
//Clean the build files
gulp.task('clean', function () {  
  return gulp.src( BUILD, { read: false })
    .pipe(clean());
});

//Start server and watch for changes
gulp.task('start', function () {
  return nodemon({
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
  var modules = ['ticker'];
  return modules.forEach(function (module) {
    return gulp.src([
      BASE + module + '/' + module + '.js',
      BASE + module + '/' + '*.js'
    ])
      .pipe(concat(module + '.js'))
      .pipe(gulp.dest(BUILD + module));
  });
});

//Run less conversion
gulp.task('less', function () {
  return gulp.src(BASE + '**/*.less')
    .pipe(less())
    .pipe(gulp.dest(BUILD));
});


/* Task batchers */
gulp.task('build', ['install', 'vendorJS', 'vendorCSS', 'concat-modules', 'less']);
gulp.task('default', ['build', 'start']);