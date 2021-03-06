var gulp = require('gulp');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var notify = require('gulp-notify');
var rupture = require('rupture');
var stylus = require('gulp-stylus');


gulp.task('default', ['watch', 'comp-stylus']);

gulp.task('watch', function () {
	gulp.watch('./stylus/*.styl', ['comp-stylus']);
	gulp.watch('./css/*.css', ['minify-css']);
});

gulp.task('minify-css', function () {
	notify('minificando');
	gulp.src('./css/general.css')
		.pipe(cleanCSS({
			debug: false
		}))
		.pipe(rename('general.min.css'))
		.pipe(gulp.dest('./css/'));
});

gulp.task('comp-stylus', function () {

	var opts = {
		use: [rupture()]
	};

	gulp.src('./stylus/general.styl')
		.pipe(stylus(opts))
		.pipe(rename('general.css'))
		.pipe(gulp.dest('./css/'));
});