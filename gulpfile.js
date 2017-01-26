var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// funcion o tarea para utilizar browser-sync
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./app"
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Función o tarea para compilar los archivos .scss en .css en el directorio especifico (live)
gulp.task('sass', function(){
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

//Funcion watch para automatizar la compilación de css
gulp.task('watch', function(){
  gulp.watch('scss/**/*.scss', ['sass']);
});
