'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass')(require('sass'));
var sourcemaps   = require('gulp-sourcemaps');
var fileinclude  = require('gulp-file-include');
var autoprefixer = require('gulp-autoprefixer');
var bs           = require('browser-sync').create();
var rimraf       = require('rimraf');

var path = {
  src: {
    html    : 'source/*.html',
    others  : 'source/*.+(php|ico|png)',
    htminc  : 'source/partials/**/*.htm',
    incdir  : 'source/partials/',
    plugins : 'source/plugins/**/*.*',
    js      : 'source/js/*.js',
    scss    : 'source/scss/**/*.scss',
    images  : 'source/images/**/*.+(png|jpg|gif|svg)'
  },
  build: {
    dirDev : 'theme/'
  }
};

// HTML
function html_build() {
  return gulp.src(path.src.html)
    .pipe(fileinclude({
      basepath: path.src.incdir
    }))
    .pipe(gulp.dest(path.build.dirDev))
    .pipe(bs.reload({
      stream: true
    }));
}

// SCSS
function scss_build() {
  return gulp.src(path.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(path.build.dirDev + 'css/'))
    .pipe(bs.reload({
      stream: true
    }));
}

// Javascript
function js_build() {
  return gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.dirDev + 'js/'))
    .pipe(bs.reload({
      stream: true
    }));
}

// Images
function images_build() {
  return gulp.src(path.src.images)
    .pipe(gulp.dest(path.build.dirDev + 'images/'))
    .pipe(bs.reload({
      stream: true
    }));
}

// Plugins
function plugins_build() {
  return gulp.src(path.src.plugins)
    .pipe(gulp.dest(path.build.dirDev + 'plugins/'))
    .pipe(bs.reload({
      stream: true
    }));
}

// Other files like favicon, php, sourcele-icon on root directory
function others_build() {
  return gulp.src(path.src.others)
    .pipe(gulp.dest(path.build.dirDev));
}

// Clean Build Folder
function clean(cb) {
  return rimraf('./theme', cb);
}

// Watch Task
function watch_build() {
  gulp.watch(path.src.html, gulp.series(html_build));
  gulp.watch(path.src.htminc, gulp.series(html_build));
  gulp.watch(path.src.scss, gulp.series(scss_build));
  gulp.watch(path.src.js, gulp.series(js_build));
  gulp.watch(path.src.images, gulp.series(images_build));
  gulp.watch(path.src.plugins, gulp.series(plugins_build));
}

// Build Task
exports.default = gulp.series(
  clean,
  html_build,
  js_build,
  scss_build,
  images_build,
  plugins_build,
  others_build,
  gulp.parallel(
    watch_build,
    function() {
      bs.init({
        server: {
          baseDir: path.build.dirDev
        }
      });
    })
);
