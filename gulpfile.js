const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');

// TODO: bundle css files into one file
function buildStyles() {
  return gulp.src('assets/scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(gulp.dest('assets/css'))
  .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
}

// TODO: bundle js files into one file
function bundleJS() {
  return gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
}

function htmlMinify() {
  const options = {
    collapseWhitespace: true,
    removeComments: true,
  };

  return gulp.src('*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist'));
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
  gulp.watch('*.html', htmlMinify).on('change', browserSync.reload);
  // gulp.watch("assets/scss/*.scss", gulp.series('sass'));
  gulp.watch("assets/scss/*.scss", buildStyles);
}

// TODO: bundle assets (images)
function bundleAssets() {}

exports.buildStyles = buildStyles;
exports.bundleJS = bundleJS;
exports.htmlMinify = htmlMinify;
exports.watch = watch;
exports.bundleAssets = bundleAssets;
