var fs = require('fs');
var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var rename = require('gulp-rename');

function changedJsWarning(event) {
  var relPath = event.path.replace(/.*((\/|\\)lib\2js\2.*?\.js)/, '.$1');
  console.warn('Warning: Detected the following change to \'./lib/js\'');
  console.warn('\tFile: ' + relPath + '\n\tAction: ' + event.type);
  console.warn('\'./lib/js/\' is a generated directory. Changes made here are liable to be overwritten.');
}

gulp.task('watch', ['buildEs6', 'watchEs6', 'watchJs']);

gulp.task('watchEs6', ['buildEs6'], function() {
  gulp.watch('./lib/es6/**/*.es6', ['buildEs6']);
});

gulp.task('watchJs', function() {
  var watcher = gulp.watch('./lib/js/**/*.js');
  var cb = function(event) {
    if (!fs.existsSync('./generated/changedEs6.txt')) {
      changedJsWarning(event);
    }
  };
  watcher.on('change', cb);
});

gulp.task('buildEs6', ['setChangedEs6', 'transpileEs6', 'cleanup']);

gulp.task('setChangedEs6', function() {
  if (!fs.existsSync('./generated')) {
    fs.mkdirSync('./generated');
  }
  fs.writeFileSync('./generated/changedEs6.txt', 'true');
});

gulp.task('transpileEs6', ['setChangedEs6', 'changeExt'], function() {
  return gulp.src('./generated/renamed/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./lib/js'));
});

gulp.task('changeExt', function() {
  return gulp.src('./lib/es6/**/*.es6')
    .pipe(rename(function(srcpath) {
      srcpath.extname = '.js';
    }))
    .pipe(gulp.dest('./generated/renamed'));
});

gulp.task('cleanup', ['setChangedEs6', 'transpileEs6'], function(cb) {
  setTimeout(function () {
    del(['./generated'], cb);
  }, 1000);
});



















gulp.task('default', ['buildEs6']);



gulp.task('changedEs6', function(cb) {
  if (!fs.existsSync('./generated')) {
    fs.mkdirSync('./generated');
  }
  fs.writeFileSync('./generated/changedEs6.txt', 'true');
});

// gulp.task('scripts', ['clean'], function() {
//   return gulp.src('./lib/**/*.js')
//     .pipe(babel())
//     .pipe(concat('index.js'))
//     .pipe(gulp.dest('.'));
// });
