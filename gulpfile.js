const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const jsImport = require('gulp-js-import');
const babel = require('gulp-babel');
const terser = require('gulp-terser');


function scssTask() {
    return gulp.src('styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/'));
}


function jsTask() {
    return gulp.src('scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(jsImport({hideConsole: true}))
        .pipe(terser())
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/'));
}

function watchTask() {
    gulp.watch('styles/**/*.scss', scssTask);
    gulp.watch('scripts/**/*.js', jsTask);
};


exports.scss = scssTask;
exports.js = jsTask;

exports.build = gulp.series(scssTask, jsTask);

exports.watch = watchTask;

exports.default = gulp.series(
    gulp.parallel(scssTask, jsTask), 
    watchTask);