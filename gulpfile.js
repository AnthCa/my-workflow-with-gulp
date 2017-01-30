var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify= require('gulp-uglify');
var cssnano  = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

// Servidor estatico + watching javascripy/scss/html files.
// Static server + watching javascript/scss/html files.
gulp.task('default', ['css', 'javascript',], function() {
    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/js/*.js", ["javascript"]).on('change', browserSync.  reload);
    gulp.watch("scss/**/*.scss", ['css']);
    gulp.watch("app/*.html").on('change', browserSync.  reload);
    gulp.watch("./*.html", ["html"]); // Automatizar el minficado de archivos html
});

//Tarea para minificar archivos .html.
// Task to minify .html files.
gulp.task('html', function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('app'));
});

//Tarea para minimizar imágenes
//Task minify images
gulp.task('images', function (){
  gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('app/img'))
});

// Comprimir js
// Compress js
gulp.task('javascript',function () {
  gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/js/dist'));
});

// Compilado de css, minificado de css, browsersync(live reload)
// Compile sass into CSS & auto-inject into browsers
gulp.task('css', function(){
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
