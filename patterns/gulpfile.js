'use strict';

const gulp         = require('gulp');
const fractal      = require('./fractal.config.js');
const logger       = fractal.cli.console;
const sass         = require('gulp-sass');
const sassGlob     = require('gulp-sass-glob');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const path         = require('path');

gulp.task('sass', gulp.series( function() {
    return gulp.src('assets/scss/global.scss')
    .pipe(customPlumber('Error running Sass'))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
}));

gulp.task('watch', gulp.series('sass', function() {
   gulp.watch([
        'src/components/**/**/*.scss',
        'assets/scss/global.scss'
        ], gulp.series('sass'));
}));

function customPlumber(errTitle) {
    return plumber({
        errorHandler: notify.onError({
            title: errTitle || "Error running Gulp",
            message: "Error: <%= error.message %>",
        })
    });
}

gulp.task('fractal:start', gulp.series( function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
}));

gulp.task('default', gulp.series('fractal:start', 'sass', 'watch'));