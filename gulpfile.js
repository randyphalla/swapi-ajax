const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('sass', async function() {
  return gulp.src('assets/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('assets/css'))
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

function bundleJS() {
  return gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
}

function watch() {
  browserSync.init({
    open: false,
    browser: "google chrome",
    server: {
      baseDir: "./",
    }
  });

  gulp.watch('assets/js/*.js', bundleJS).on('change', browserSync.reload);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch("assets/scss/*.scss", gulp.series('sass'));
}

// TODO: bundle css into dist
// TODO: bundle assets (images)

exports.bundleJS = bundleJS;
exports.watch = watch;