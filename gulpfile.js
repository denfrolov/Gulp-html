var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	browsersync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify");

gulp.task('browser-sync', function () {
	browsersync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function () {
	return gulp.src('app/css/main.scss')
		.pipe(sass({
			outputStyle: 'expand'
		}).on("error", notify.onError()))
		.pipe(rename({
			suffix: '.min',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss({
			level: {
				1: {
					specialComments: 0
				}
			}
		})) // Opt., comment out when debugging
		.pipe(gulp.dest('app/css'))
		.pipe(browsersync.reload({
			stream: true
		}))
});

gulp.task('libs-styles', function () {
	return gulp.src([
		'app/libs/bootstrap/dist/css/bootstrap.min.css'
	])
		.pipe(concat('libs.min.css'))
		.pipe(cleancss({
			level: {
				1: {
					specialComments: 0
				}
			}
		})) // Opt., comment out when debugging
		.pipe(gulp.dest('app/libs'))
});

gulp.task('js', function () {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
	])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify()) // Mifify js (opt.)
		.pipe(gulp.dest('app/js'))
		.pipe(browsersync.reload({
			stream: true
		}))
});

gulp.task('watch', function () {
	gulp.watch('app/' + syntax + '/**/*.' + syntax + '', gulp.parallel('styles'));
	gulp.watch('app/js/*.js', browsersync.reload);
	gulp.watch('app/*.html', browsersync.reload)
});

gulp.task('default', gulp.parallel('watch', 'libs-styles', 'styles', 'js', 'browser-sync'));