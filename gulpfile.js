var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cssnano  = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');

// funcion o tarea para utilizar browser-sync
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./app"
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Tarea o funcion para automatizar prefijos css
gulp.task('autoprefix', () =>
    gulp.src('scss/**/*.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css/'))
);

//Función para minimizar imágenes
gulp.task('optimize', () =>
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img'))
);

// Funcion para automatizar compilado de css, minificado de css, browsersync(live reload)
gulp.task('sass', function(){
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    // .pipe(cssnano())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

// //Funcion watch para automatizar la compilación de css
// gulp.task('watch', function(){
//   gulp.watch('scss/**/*.scss', ['sass']);
// });
