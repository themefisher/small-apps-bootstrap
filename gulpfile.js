'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var fileinclude  = require('gulp-file-include');
var autoprefixer = require('gulp-autoprefixer');
var runSequence  = require('run-sequence');
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
gulp.task('html:build', function () {
  return gulp.src(path.src.html)
    .pipe(fileinclude({
      basepath: path.src.incdir
    }))
    .pipe(gulp.dest(path.build.dirDev))
    .pipe(bs.reload({
      stream: true
    }));
});

// SCSS
gulp.task('scss:build', function () {
return gulp.src(path.src.scss)
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write('/'))
  .pipe(gulp.dest(path.build.dirDev + 'css/'))
  .pipe(bs.reload({
    stream: true
  }));
});

// Javascript
gulp.task('js:build', function () {
return gulp.src(path.src.js)
  .pipe(gulp.dest(path.build.dirDev + 'js/'))
  .pipe(bs.reload({
    stream: true
  }));
});

// Images
gulp.task('images:build', function () {
return gulp.src(path.src.images)
  .pipe(gulp.dest(path.build.dirDev + 'images/'))
  .pipe(bs.reload({
    stream: true
  }));
});

// Plugins
gulp.task('plugins:build', function () {
return gulp.src(path.src.plugins)
  .pipe(gulp.dest(path.build.dirDev + 'plugins/'))
  .pipe(bs.reload({
    stream: true
  }));
});

// Other files like favicon, php, sourcele-icon on root directory
gulp.task('others:build', function () {
return gulp.src(path.src.others)
  .pipe(gulp.dest(path.build.dirDev))
});

// Clean Build Folder
gulp.task('clean', function (cb) {
  rimraf('./theme', cb);
});

// Watch Task
gulp.task('watch:build', function () {
  gulp.watch(path.src.html, ['html:build']);
  gulp.watch(path.src.htminc, ['html:build']);
  gulp.watch(path.src.scss, ['scss:build']);
  gulp.watch(path.src.js, ['js:build']);
  gulp.watch(path.src.images, ['images:build']);
  gulp.watch(path.src.plugins, ['plugins:build']);
});

// Build Task
gulp.task('build', function () {
  runSequence(
    'clean',
    'html:build',
    'js:build',
    'scss:build',
    'images:build',
    'plugins:build',
    'others:build',
    'watch:build',
    function () {
      bs.init({
        server: {
          baseDir: path.build.dirDev
        }
      });
    }
  );
});

gulp.task("default", ["build"]);