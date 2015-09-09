/* Dependencies */
var gulp = require('gulp');
var gls = require('gulp-live-server');

//Run the server
gulp.task('server', function () {
  var port = process.env.PORT || 8080;
  var server = gls.static(['src', 'build'], port);
  server.start();

  require('../server-scripts/portfolio-updater.js').initialize();
});