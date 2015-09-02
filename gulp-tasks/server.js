/* Dependencies */
var gulp = require('gulp');
var express = require('gulp-express');

/* Server tasks */

//Run the server
gulp.task('server', function () {
  express.run(['server.js']);
});