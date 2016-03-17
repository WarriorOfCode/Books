var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
	gulp.src('./scss/style.scss')
		.pipe(sass({errLogToConsole: true}))
		.pipe(gulp.dest('./public/css'))
});

gulp.task('default',function() {
	gulp.start('styles');
	gulp.watch('./scss/*.scss',['styles']);
});