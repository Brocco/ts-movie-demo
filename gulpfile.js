var gulp = require('gulp'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  runSequence = require('run-sequence'),
  tsc = require('gulp-tsc');

var port = 3000,
  paths = {
  indexHtml: './app/index.html',
  ts: './app/ts/app.ts',
  jsLib: [
    './bower_components/jquery/dist/jquery.js',
    './bower_components/angular/angular.js'
  ],
  views: './app/views/**/*.html',
  styles: './app/styles/**/*',
  dist: {
    root: './dist',
    js: './dist/js',
    views: './dist/views',
    styles: './dist/styles'
  }
};

gulp.task('default', function (callback) {
  runSequence('clean',
    ['build-ts', 'build-js-lib', 'build-html'],
    'dev-server',
    callback);
});

gulp.task('build-ts', function () {
  return gulp.src(paths.ts)
    .pipe(tsc({
      noResolve: false,
      out: 'app.js',
      outDir: paths.dist.js,
      removeComments: true,
      //sourcePath: '../../app/ts',
      //sourcemap: true,
      target: 'ES5'
    }))
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('build-js-lib', function () {
  return gulp.src(paths.jsLib)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('build-html', function () {
  gulp.src(paths.indexHtml)
    .pipe(gulp.dest(paths.dist.root));

  return gulp.src(paths.views)
    .pipe(gulp.dest(paths.dist.views));
});

gulp.task('build-style', function(){
  return gulp.src(paths.styles)
    .pipe(gulp.dest(paths.dist.styles));
});

gulp.task('dev-server', function () {
  connect.server({
    root: 'dist',
    port: port,
    livereload: true
  });
});

gulp.task('clean', function () {
  return gulp.src('./dist/*', {read: false})
    .pipe(clean());
});