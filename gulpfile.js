var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var del = require('del');

gulp.task('default', ['scripts'], function() {

});

gulp.task('clean', function(cb) {
  del(['index.js'], cb);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src('./lib/**/*.js')
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(gulp.dest('.'));
});
