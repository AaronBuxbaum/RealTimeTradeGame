/* Dependencies */
var gulp = require('gulp');
var gls = require('gulp-live-server');

//Run the server
gulp.task('server', function () {
  var port = process.env.PORT || 8080;
  var server = gls.static('build', port);

  if (process.env.NODE_ENV === 'production') {
    server.config.livereload = false;
  }

  require('connect-livereload')();
  require('../server-scripts/portfolio-updater.js').initialize();

  server.start();
});