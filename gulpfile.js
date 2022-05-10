const _pathSASS = "./src/_sass";
const _pathCSS = "./src/_css";

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const sourcemaps  = require('gulp-sourcemaps');

//compile scss into css
function style(){
    // 1. where is my scss file
return gulp.src(_pathSASS+'/**/*.scss')
    // 2. Pass that file through sass compiler
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./maps'))
    // 3 where do I save the compiled css
    .pipe(gulp.dest(_pathCSS))
    // 4 stream changes to all browsers
    .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server: {
            baseDir: './src',
            index: './index.html'
        }
    });
    gulp.watch(_pathSASS+'/**/*.scss', style);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
    gulp.watch('./src/**/*').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;