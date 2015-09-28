var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('compile-typescript', function () {
	var tsProject = ts.createProject('tsconfig.json');

	return gulp
		.src('src/**/*.ts')
        .pipe(ts(tsProject))
		.js
		.pipe(gulp.dest('release'));
});