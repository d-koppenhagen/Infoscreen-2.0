var gulp = require('gulp');

var changed = require('gulp-changed'),
    jshint = require ('gulp-jshint'),
    concat = require ('gulp-concat'),
    uglify = require ('gulp-uglify'),
    rename = require('gulp-rename'),
    imagemin = require ('gulp-imagemin'),
    clean = require('gulp-clean'),
    minifyhtml = require ('gulp-minify-html'),
    autoprefixer = require ('gulp-autoprefixer'),
    minifyCSS = require ('gulp-minify-css'),
    dirSync = require('gulp-directory-sync');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('./**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('./**/*.js', ['jshint']);
});

gulp.task('compress', ['sync','minify-html','minify-css','minify-js'], function() {
  return ;
});

gulp.task( 'sync', function() {
    return gulp.src( '' )
        .pipe(dirSync( './frontend/', './frontend-min/', { printSummary: true } ))
        //.on('error', gutil.log);
} );

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('./frontend/**/*.html')
    .pipe(minifyhtml(opts))
    .pipe(gulp.dest('./frontend-min/'));
});

gulp.task('minify-css', function() {
  return gulp.src('./frontend/**/*.css')
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./frontend-min/'));
});

gulp.task('minify-js', function() {
  return gulp.src('frontend/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('frontend-min/'));
});

// compress images
gulp.task('images', function() {
    var imgSrc = './resources/photos/**/*',
        imgDst = './resources/build';

    gulp.src(imgSrc)
      .pipe(changed(imgDst))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDst));
});
