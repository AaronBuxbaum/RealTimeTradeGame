/* Dependencies */
var gulp = require('gulp');
var gls = require('gulp-live-server');

//Run the server
gulp.task('server', function () {
  var port = process.env.PORT || 8080;
  var server = gls([gls.script, 'build', port], { env: { NODE_ENV: 'development' } });

  require('connect-livereload')();
  require('../server-scripts/portfolio-updater.js').initialize();

  server.start();
});