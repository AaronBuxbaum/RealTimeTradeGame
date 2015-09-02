/* Dependencies */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var g = require('./global.json');


/* Concatenate tasks */

//Concatenate vendor JS into one file
gulp.task('concat-vendor-js', function () {
  return gulp.src([
    g.NPM + 'lodash/index.js',
    g.NPM + 'moment/moment.js',
    g.NPM + 'angular/angular.js',
    g.NPM + 'angular-animate/angular-animate.js',
    g.NPM + 'angular-aria/angular-aria.js',
    g.NPM + 'angular-messages/angular-messages.js',
    g.NPM + 'angular-material/angular-material.js',
    g.NPM + 'angular-material-icons/angular-material-icons.js',
    g.NPM + 'jquery/dist/jquery.js',
    g.NPM + 'firebase/firebase-debug.js',
    g.NPM + 'angularfire/dist/angularfire.js',
    g.NPM + 'highstock-release/highstock.src.js',
    g.NPM + 'highcharts-ng/dist/highcharts-ng.js',
    g.NPM + 'angular-moment/angular-moment.js'
  ])
    .pipe(concat('vendors.js'))
  //.pipe(uglify())
    .pipe(gulp.dest(g.BUILD));
});

//Concatenate vendor CSS into one file
gulp.task('concat-vendor-css', function () {
  return gulp.src([
    g.NPM + 'angular-material/angular-material.css',
    g.NPM + 'angular-material-icons/angular-material-icons.css'
  ])
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
