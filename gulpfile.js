/***
 *
 * GulpJS file v.1.2
 *
 * @author : Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @type {*|exports|module.exports}
 *
 */

'use strict';

// Include Gulp
var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jsdoc = require('gulp-jsdoc3');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var Server = require('karma').Server;
var addStream = require('add-stream');
var angularTemplateCache = require('gulp-angular-templatecache');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');
var gzip = require('gulp-gzip');
var protractor = require('gulp-protractor');

// Build Destination
var dest = 'build';

// Vendor JS files
var vendorJsFiles = [
  'src/client/app/bower_components/angular/angular.js',
  'src/client/app/bower_components/angular-route/angular-route.js',
  'src/client/app/bower_components/angular-animate/angular-animate.js',
  'src/client/app/bower_components/angular-sanitize/angular-sanitize.js',
  'src/client/app/bower_components/angular-jwt/dist/angular-jwt.js',
  'src/client/app/bower_components/a0-angular-storage/dist/angular-storage.js',
  'src/client/app/bower_components/angularUtils-pagination/dirPagination.js',
  'src/client/app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',

  // Angular Formly
  'src/client/app/bower_components/api-check/dist/api-check.js',
  'src/client/app/bower_components/angular-formly/dist/formly.js',
  'src/client/app/bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',

  // Google Maps (@see - angular-google-maps)1
  'src/client/app/bower_components/lodash/lodash.js',
  'src/client/app/bower_components/angular-simple-logger/dist/angular-simple-logger.js',
  'src/client/app/bower_components/angular-google-maps/dist/angular-google-maps.js',

  //'app/bower_components/slick-carousel/slick/slick.js',
  //'app/bower_components/angular-slick/dist/slick.js',
  //'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
  //'app/bower_components/slick-carousel/slick/slick.js',
  //'app/bower_components/angular-slick/dist/slick.js',

];

// Source JS files
var customJsFiles = [

  // CUSTOM
  'src/client/app/components/auth/auth.js',

  'src/client/app/components/frontpage/frontpage.js',
  'src/client/app/components/events/events.js',
  'src/client/app/components/articles/articles.js',
  'src/client/app/components/recipes/recipes.js',
  'src/client/app/components/dashboard/dashboard.js',
  'src/client/app/components/contact/contact.js',
  'src/client/app/components/login/login.js',
  'src/client/app/components/user/user.js',
  'src/client/app/components/register/register.js',
  'src/client/app/components/static-pages/static-pages.js',
  'src/client/app/components/meta/meta.js',

  //'src/client/app/components/news/news.js',
  //'src/client/app/components/reviews/reviews.js',

  // SHARED
  'src/client/app/shared/directives/mobile-menu/mobile-menu.js',

  // Main
  'src/client/app/app.js'
];

var sourceJsFiles = vendorJsFiles.concat(customJsFiles);

// Source SCSS files
var sassFiles = [
  './src/client/app/sass/*.scss',
  './src/client/app/sass/**/*.scss',
  './src/client/app/components/**/*.scss'
];

// Compile CSS from SCSS files
gulp.task('css', function() {
  return gulp
    .src(sassFiles)
    .pipe(concat('build.css'))
    //     .pipe(rename({suffix: '.min'}))
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(dest + '/css'));

});

// Concatenate/Uglify JS Files
gulp.task('scripts', ['css'], function() {
  return gulp
    .src(sourceJsFiles)
    //.pipe(sourcemaps.write('.map'))
    .pipe(addStream.obj(prepareTemplates()))
    .pipe(concat('build.js'))
    //.pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(dest + '/js'));

});

// Linting
gulp.task('lint', [], function() {
  return gulp
    .src(customJsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default', {verbose: true}));
});

// Code styling
gulp.task('style', ['scripts', 'css', 'docs', 'lint'], function() {
  return gulp
    .src(customJsFiles)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

// HTML
gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare: true
  };
  return gulp
    .src('./src/client/app/index.html')
    .pipe(minifyHTML(opts))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./build/'));
});

/// Documentation (JSDoc)
gulp.task('docs', ['scripts'], function(callback) {
  gulp
    .src(
      ['README.md'].concat(customJsFiles)
      , {read: false})
    .pipe(jsdoc(callback));
});

// Angular Template Cache
function prepareTemplates() {
  return gulp
    .src([
      './src/client/app/**/*.tpl.html'
    ])
    .pipe(angularTemplateCache());
}

// WATCHERS
gulp.task('watch', function() {

  gulp.watch([
      './src/client/app/components/**/*.scss',
      './src/client/app/sass/**/*.scss',
      './src/client/app/shared/directives/**/*.scss'
    ],
    ['css']
  );

  gulp.watch([
    'src/client/app/components/**/*.js',
    'src/client/app/shared/**/*.js',
    'src/client/app/app.js'
  ], ['lint', 'style', 'docs', 'scripts']);

  gulp.watch('src/client/app/**/*.tpl.html', ['lint', 'style', 'docs', 'scripts']);

  gulp.watch(['src/client/app/index.html'], ['html']);

});

// Unit Testing
gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

//e2e testing
gulp.task('webdriver_update', protractor.webdriver_update);

// this run following task will keep running indefinitely.
gulp.task('webdriver_standalone', ['webdriver_update'], protractor.webdriver_standalone);

gulp.task('e2e', ['webdriver_update'], function(done) {
  gulp.src(['src/client/app/tests/**/*.spec.js'])
    .pipe(protractor.protractor({
      configFile: 'src/client/app/tests/protractor.conf.js'
    }),done());
});

// Default
gulp.task('default', [
  'scripts', 'css', 'lint', 'style', 'docs', 'html', 'watch'
]);

