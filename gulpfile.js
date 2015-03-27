var path = require('path');

var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var del = require('del');
var rename = require('gulp-rename');

gulp.task('default', ['babel'], function() {

});

gulp.task('clean', function(cb) {
  del(['generated'], cb);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src('./lib/**/*.js')
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('changeExt', ['clean'], function() {
  return gulp.src('./lib/**/*.es6')
    .pipe(rename(function(srcpath) {
      srcpath.extname = '.js';
    }))
    .pipe(gulp.dest('./generated/renamed'));
});

gulp.task('babel', ['changeExt'], function() {
  return gulp.src('./generated/renamed/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./generated/transpiled'));
});
