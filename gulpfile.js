var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Uglyfies js on to /js/minjs
gulp.task('scripts', function(){
    gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("js/minjs"));
});

// Compiles sass to /css
gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});

// reload server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// watch for changes on files
gulp.task('watch', function(){
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch("*.html", ['bs-reload']);
});

// deploys
gulp.task('default',  ['scripts', 'sass','browser-sync','watch']);