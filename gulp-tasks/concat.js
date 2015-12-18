/* Dependencies */
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var ngHtml2Js = require('gulp-ng-html2js');
var plumber = require('gulp-plumber');
var json = require('gulp-json-concat');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var g = require('./global.json');


//Prepend the NPM directory to all passed-in files
function prependNPM(fileNames) {
  return fileNames.map(function (fileName) {
    return g.NPM + fileName
  });
}


//Concat everything down
gulp.task('concat', ['concat-json', 'concat-vendor-js', 'concat-vendor-css', 'concat-app-js', 'concat-app-css', 'concat-app-html', 'copy-index']);

//Bundle vendor JS files
gulp.task('concat-vendor-js', function () {
  return browserify({
    entries: 'browserify.js',
    insertGlobals: true,
    debug: true
  })
    .bundle()
    .pipe(source('vendors.js'))
    .pipe(gulp.dest('build'));
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
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(g.BUILD));
});

//Run less conversion and then concat into one file
gulp.task('concat-app-css', function () {
  return gulp
    .src(g.SRC + '**/*.less')
    .pipe(plumber({ errorHandler: true }))
    .pipe(less())
    .pipe(concat('app.css'))
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

//Concat json files into a dictionary file
gulp.task('concat-json', function () {
  return gulp
    .src(g.SRC + '**/*.json')
    .pipe(json('json.js', function (data) {
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(gulp.dest(g.BUILD));
});

//Copy the index.html file to the build directory
gulp.task('copy-index', function () {
  return gulp
    .src(g.SRC + 'index.html')
    .pipe(gulp.dest(g.BUILD));
});