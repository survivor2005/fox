const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    uglify = require('gulp-uglify');

function htaccess(){
    return gulp.src('./src/**/.htaccess', {dot: true})
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.stream());
}


filesExt = './src/**/*.+(txt|php|html|css|jpg|JPG|jpeg|png|gif|pdf|svg|mov|MOV|ttf|otf|webmanifest|ini|xml)';
function files() {
    return gulp.src(filesExt)
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream());
}

function delImg() {
    return del(['./build/img/**/*']);
}
function delHtml() {
    return del(['./build/**/*.+(php|html)']);
}
function delStyle() {
    return del(['./build/**/*.+(scss|css)']);
}


function imgMin() {
    return gulp.src('./src/img/**/*.+(jpg|jpeg|png|gif|svg)')
    .pipe(
        cache(
        imagemin()
        )
        )
        .pipe(gulp.dest('./build/img/'));
}


scriptsArr = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/jquery-migrate/dist/jquery-migrate.min.js',
    './node_modules/slick-carousel/slick/slick.min.js',
    './src/assets/scripts/review-slider.js',
    // './src/js/libjs.js',
    // './src/**/*.js',
    
];

function scripts() {
    return gulp.src(
            scriptsArr
        )
        .pipe(
            babel({
                presets: ['@babel/env']
            })
            )
        .pipe(uglify())

        .pipe(concat('index.js'))
        .pipe(gulp.dest('./build/assets/scripts'))
        .pipe(browserSync.stream());
}

function style() {
    return gulp.src('./src/assets/styles/styles.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 15 versions','>1%', 'ie 7', 'ie 8'],
            cascade: false
        }))

        .pipe(cleanCSS({level:2}))

        .pipe(gulp.dest('./build/assets/styles'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        proxy: 'http://fox.local/',
        // tunnel:true
    });
    gulp.watch('./src/**/*.scss', style);
    gulp.watch(scriptsArr, scripts);
    gulp.watch(filesExt, files);
    gulp.watch('./src/**/.htaccess', htaccess);
    
}

gulp.task('styles', style);
gulp.task('scripts', scripts);
gulp.task('files', files);
gulp.task('htaccess', htaccess);
gulp.task('imgMin', imgMin);
gulp.task('delImg', delImg);
gulp.task('delHtml', delHtml);
gulp.task('delStyle', delStyle);
gulp.task('watch', watch);
