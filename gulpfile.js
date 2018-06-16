const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const browserify = require('gulp-browserify');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("assets/css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('assets/js/*js')
        .pipe(browserify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js', 'js-watch'], function () {

    browserSync.init({
        server: ""
    });

    gulp.watch("assets/js/*.js", ['js-watch']);
    gulp.watch("assets/scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);