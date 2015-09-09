/* Dependencies */
var gulp = require('gulp');
var gls = require('gulp-live-server');

/* Server tasks */

//Run the server
gulp.task('server', function () {
  var server = gls.new('server.js');
  server.start();
});