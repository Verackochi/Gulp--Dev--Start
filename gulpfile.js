/* переменные для запуска плагинов */
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    /* Плагин для конвертации шрифтов ttf в woff gulp-ttf2woff*/
    ttf2woff = require('gulp-ttf2woff'),
    /* Плагин для конвертации шрифтов ttf в woff gulp-ttf2woff2*/
    ttf2woff2 = require('gulp-ttf2woff2'),
    uglify = require('gulp-uglify-es').default;




    /* конвертация из scss в css */
gulp.task('sass', function(){
    return gulp.src('app/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({ stream: true }))
});

/*gulp.task('fonts',function(){
    return gulp.src('app/fonts')
        .pipe(ttf2woff())
        .pipe(ttf2woff2())
        .pipe(dest('build/fonts'))
        
       /* .pipe(dest('build/fonts'));
});*/

gulp.task('script', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/jquery/dist/jquery.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

gulp.task('style', function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/normalize.css/normalize.css'
        ])
        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('build/css'))
});

/* автобновление для html */

gulp.task('html', function(){
    return gulp.src('app/*.html')
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.reload({ stream: true }))
        
});

gulp.task('js', function () {
    gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}))
});

/* функция для работы browserSync */
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function(){
    gulp.watch('app/scss/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('style','script', 'sass', 'watch', 'browser-sync','html'));