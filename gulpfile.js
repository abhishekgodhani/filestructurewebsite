var gulp = require('gulp');

gulp.task('hello', function() {
	console.log('Hello Abhishek');
});

var sass = require('gulp-sass');

gulp.task('sass', function(){
	return gulp.src('app/scss/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/styles.scss' , ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload)
})

var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
})

var useref = require('gulp-useref');

gulp.task('useref', function(){
	return gulp.src('app/*.html')
	.pipe(useref())
	.pipe(gulp.dest('dist'))
});

var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

