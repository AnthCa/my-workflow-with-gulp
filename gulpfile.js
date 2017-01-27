var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano  = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

// funcion o tarea para utilizar browser-sync
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./app"
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("./*.html", ["minificar"]); // Automatizar el minficado de archivos html
});

//Tarea para minificar archivos .html
gulp.task('minificar', function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('app'));
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
    // .pipe(cssnano()) //Pausando el minificado automatico
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
