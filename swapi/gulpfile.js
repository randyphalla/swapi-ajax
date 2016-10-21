var gulp = require('gulp');
var sass = require('gulp-sass');
var refresh = require('gulp-refresh');

// HTML TASK
var html = '*.html'; // Select all html
gulp.task('html', function() {
	gulp.src('*.html')
		.pipe(refresh(html))
});


// SCSS TASK
gulp.task('scss', function() {
	gulp.src('scss/*.scss')
		.pipe(sass({outputStyle: 'expanded'})
		.on('error', sass.logError))
		.pipe(gulp.dest('css/'))
		.pipe(refresh())
});


// JavaScript Task
var js = '*.js'; // Select all javascript
gulp.task('js', function() {
	gulp.src('js/*.js')
		.pipe(refresh(js))
});


// Watch our files
gulp.task('watch', function() {
	refresh.listen()
	gulp.watch('*.html', ['html'])
	gulp.watch('scss/*.scss', ['scss'])
	gulp.watch('js/*.js', ['js'])
});

// Run our Gulp
gulp.task('default', ['html', 'scss', 'js', 'watch']);