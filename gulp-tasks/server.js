/* Dependencies */
var gulp = require('gulp');
var gls = require('gulp-live-server');

//Run the server
gulp.task('server', function () {
  var port = process.env.PORT || 8080;
  var server = gls([gls.script, 'build', port], undefined, 35729);

  require('../server-scripts/portfolio-updater.js').initialize();

  server.start();
});