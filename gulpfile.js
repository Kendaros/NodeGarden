var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var compress = require('gulp-yuicompressor');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'compress-css', 'compress-js'], function () {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./sass/*.scss", ['sass']);
    gulp.watch("./css/style.css", ['compress-css']);
    gulp.watch("./js/app.js", ['compress-js']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("./sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css/"))
        .pipe(browserSync.stream());
});

gulp.task('compress-css', function () {
    gulp.src('./css/style.css')
        .pipe(compress({
            type: 'css'
        }))
        .pipe(gulp.dest('./css/min/'));
});

gulp.task('compress-js', function () {
    gulp.src('./js/app.js')
        .pipe(compress({
            type: 'js'
        }))
        .pipe(gulp.dest('./js/min/'));
});

gulp.task('imagemin', function () {
    return gulp.src('img/**/*.png')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('img-min/'));
});

gulp.task('default', ['serve']);