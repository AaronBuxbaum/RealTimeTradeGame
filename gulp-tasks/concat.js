/* Dependencies */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var g = require('./global.json');

//Prepend the NPM directory to all passed-in files
function prependNPM(fileNames) {
  return fileNames.map(function (fileName) {
    return g.NPM + fileName
  });
}


/* Concatenate tasks */

//Concatenate vendor JS into one file
gulp.task('concat-vendor-js', function () {
  var vendorFiles = [
    'lodash/index.js',
    'moment/moment.js',
    'angular/angular.js',
    'angular-animate/angular-animate.js',
    'angular-aria/angular-aria.js',
    'angular-messages/angular-messages.js',
    'angular-material/angular-material.js',
    'angular-material-icons/angular-material-icons.js',
    'jquery/dist/jquery.js',
    'firebase/firebase-debug.js',
    'angularfire/dist/angularfire.js',
    'highstock-release/highstock.src.js',
    'highcharts-ng/dist/highcharts-ng.js',
    'angular-moment/angular-moment.js'
  ];

  return gulp
    .src(prependNPM(vendorFiles))
    .pipe(concat('vendors.js'))
  //.pipe(uglify())
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

//Concatenate modules into one file
gulp.task('concat-modules', function () {
  g.MODULES.forEach(function (module) {
    gulp.src([
      g.SRC + module + '/' + module + '.js',
      g.SRC + module + '/' + '*.js'
    ])
      .pipe(concat(module + '.js'))
      .pipe(gulp.dest(g.BUILD + module));

    gulp.src([g.SRC + module + '/*.html'])
      .pipe(gulp.dest(g.BUILD + module));
  });
});
