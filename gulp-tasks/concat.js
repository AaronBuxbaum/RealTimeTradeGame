/* Dependencies */
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var ngHtml2Js = require('gulp-ng-html2js');
var plumber = require('gulp-plumber');
var g = require('./global.json');


//Prepend the NPM directory to all passed-in files
function prependNPM(fileNames) {
  return fileNames.map(function (fileName) {
    return g.NPM + fileName
  });
}


//Concat everything down
gulp.task('concat', ['concat-vendor-js', 'concat-vendor-css', 'concat-app-js', 'concat-app-css', 'concat-app-html', 'copy-index']);

//Concatenate vendor JS into one file
gulp.task('concat-vendor-js', function () {
  var vendorFiles = prependNPM([
    'lodash/index.js',
    'moment/moment.js',
    'angular/angular.js',
    'angular-animate/angular-animate.js',
    'angular-aria/angular-aria.js',
    'angular-material/angular-material.js',
    'angular-material-icons/angular-material-icons.js',
    'angular-messages/angular-messages.js',
    'angular-mocks/angular-mocks.js',
    'jquery/dist/jquery.js',
    'angularfire/dist/angularfire.js',
    'highstock-release/highstock.src.js',
    'highstock-release/modules/boost.src.js',
    'highstock-release/modules/exporting.src.js',
    'highcharts-ng/dist/highcharts-ng.js',
    'angular-moment/angular-moment.js'
  ]);
  vendorFiles.push(g.BOWER + 'firebase/firebase-debug.js');

  return gulp
    .src(vendorFiles)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(g.BUILD));
});

//Concatenate vendor CSS into one file
gulp.task('concat-vendor-css', function () {
  var vendorFiles = [
    'angular-material/angular-material.css',
    'angular-material-icons/angular-material-icons.css'
  ];

  return gulp
    .src(prependNPM(vendorFiles))
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest(g.BUILD));
});

//Concat all source files into one file
gulp.task('concat-app-js', function () {
  return gulp
    .src([
      g.SRC + '**/*-module.js',
      g.SRC + '**/*.js',
      '!' + g.SRC + '**/*.spec.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(g.BUILD));
});

//Run less conversion and then concat into one file
gulp.task('concat-app-css', function () {
  return gulp
    .src(g.SRC + '**/*.less')
    .pipe(plumber({ errorHandler: true }))
    .pipe(less())
    .pipe(sourcemaps.init())
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(g.BUILD));
});

//Convert HTML -> Javascript and then concat into one file
gulp.task('concat-app-html', function () {
  return gulp
    .src(g.SRC + '**/*.html')
    .pipe(ngHtml2Js({
      moduleName: 'Templates'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(g.BUILD));
});

//Copy the index.html file to the build directory
gulp.task('copy-index', function () {
  return gulp
    .src(g.SRC + 'index.html')
    .pipe(gulp.dest(g.BUILD));
});