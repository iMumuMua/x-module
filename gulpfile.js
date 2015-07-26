var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

gulp.task('compress', function() {
    return gulp.src('lib/x-module.js')
        .pipe(gulp.dest('dist'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist', { read: false })
        .pipe(plugins.clean());
});

gulp.task('default', ['clean', 'compress']);