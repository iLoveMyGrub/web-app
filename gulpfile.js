/***
 *
 * GulpJS file v.0.1
 *
 * @author : Fat Elvis featuring Monkey Bob
 *
 * @type {*|exports|module.exports}
 *
 */


var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gzip = require('gulp-gzip'),
    minifyHTML = require('gulp-minify-html'),
    sourcemaps = require('gulp-sourcemaps');


// WATCH
gulp.task('watch', function () {

    gulp.watch([
        './app/sass/**/*.scss',
        './app/sass/*.scss'
    ], ['sass']);
    gulp.watch([
        './app/site/components/**/*.js',
        './app/app.js'
    ], ['js']);
    //gulp.watch(['./app/components/**/*.html'], ['html']);

});


// CSS & SASS
gulp.task('sass', function () {
    gulp.src([
            './app/sass/**/*.scss',
            './app/sass/**/**/*.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('source-maps'))
        .pipe(rename('build.css'))
        .pipe(gulp.dest('./app/css/'));
});

// JAVASCRIPT
gulp.task('js', function () {

    return gulp.src([

            // VENDOR
            'app/bower_components/lodash/lodash.js',
            //'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-jwt/dist/angular-jwt.js',

            'app/bower_components/angular-simple-logger/dist/angular-simple-logger.js',
            'app/bower_components/angular-google-maps/dist/angular-google-maps.js',



            // NON-CORE
            'app/bower_components/a0-angular-storage/dist/angular-storage.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            //'app/bower_components/slick-carousel/slick/slick.js',
            //'app/bower_components/angular-slick/dist/slick.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'app/bower_components/angularUtils-pagination/dirPagination.js',

            // CUSTOM
            'app/site/components/auth/auth.js',

            'app/site/api/api.js',
            'app/site/components/frontpage/frontpage.js',
            'app/site/components/events/events.js',
            'app/site/components/articles/articles.js',
            'app/site/components/reviews/reviews.js',
            'app/site/components/recipes/recipes.js',
            'app/site/components/news/news.js',
            'app/site/components/about/about.js',
            'app/site/components/dashboard/dashboard.js',
            'app/site/components/contact/contact.js',
            'app/site/components/login/login.js',
            'app/site/components/user/user.js',
            'app/site/components/register/register.js',
            'app/site/components/static-pages/static-pages.js',
            'app/site/components/meta/meta.js',

            // SHARED
            'app/site/shared/directives/mobile-menu/mobile-menu.js',

            'app/app.js'

        ])
        .pipe(concat('build.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/'));

});

// HTML
gulp.task('html', function () {

    var opts = {
        conditionals: true,
        spare: true
    };

    return gulp.src('./app/index.html')
        .pipe(minifyHTML(opts))
        .pipe(rename('build.html'))
        .pipe(gulp.dest('./app/'));
});


// Default
gulp.task('default', ['sass', 'js', 'html', 'watch']);