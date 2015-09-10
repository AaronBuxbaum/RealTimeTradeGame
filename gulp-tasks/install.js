/* Dependencies */
var gulp = require('gulp');
var install = require('gulp-install');
var g = require('./global.json');

/* Install tasks */
//Install npm and bower (not Typescripts -- those should only be run when using Visual Studio)
gulp.task('install', ['install-npm', 'install-bower']);

//Install npm packages
gulp.task('install-npm', function () {
  return gulp.src('package.json')
    .pipe(install());
});

//Install bower packages
gulp.task('install-bower', function () {
  return gulp.src('bower.json')
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