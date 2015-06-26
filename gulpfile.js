/* Dependencies */
var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var install = require('gulp-install');


/* Non-default tasks */
//Clean the build files
gulp.task('clean', function () {  
  return gulp.src('public_html', {read: false})
    .pipe(clean());
});

//Watch for changes
gulp.task('watch', function () {
  return gulp.watch('public_html/**', ['build']);
});


/* Default tasks */
//Install bower and npm
gulp.task('install', function () {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(install());
});

//Concatenate vendors into one file
gulp.task('vendor', function() {  
  return gulp.src([
      'bower_components/angular/angular.js', 
      'bower_components/firebase/firebase.js', 
      'bower_components/angularfire/dist/angularfire.js', 
      'bower_components/highcharts-ng/dist/highcharts-ng.js'
  ])
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public_html'));
});

//Run less conversion
gulp.task('less', function () {
  return gulp.src('public_html/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('public_html'));
});


/* Task batchers */
gulp.task('build', ['install', 'vendor', 'less']);
gulp.task('default', ['build']);