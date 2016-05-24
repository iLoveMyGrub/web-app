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


// Base folder
var base = './../';

// Destination
var dest = '../deploy/assets/';

// Source JS files
var vendorFiles = require("./includes/vendor.js");
var srcFiles = require("./includes/source.js");
var jsFiles = vendorFiles.concat(srcFiles);

// Source SCSS files
var sassFiles = [
  '../src/sass/seat.scss',
  //'!../src/app/**/_*.scss',
  '../src/app/**/*.scss'
];

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
var clean = require('gulp-clean');
var protractor = require('gulp-protractor');

// Base folder
var base = './../';

// Destination
var dest = '../deploy/assets/';

// Source JS files
var vendorFiles = require("./includes/vendor.js");
var srcFiles = require("./includes/source.js");
var jsFiles = vendorFiles.concat(srcFiles);

// Source SCSS files
var sassFiles = [
  '../src/client/app/sass/app.scss',
  '../src/client/app/components/**/*.scss',
];

// Compile CSS from SCSS files
gulp.task('css', function() {
  return gulp
    .src(sassFiles, {cwd: base})
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
    .src(jsFiles, {cwd: base})
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
    .src(srcFiles, {cwd: base})
    .pipe(jshint())
    .pipe(jshint.reporter('default', {verbose: true}));
});

// Code styling
gulp.task('style', ['scripts', 'css', 'docs', 'lint'], function() {
  return gulp
    .src(srcFiles, {cwd: base})
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

// Clean template
gulp.task('clean-template', function() {
  return gulp.src('build/tmp', {cwd: base, read: false})
    .pipe(clean());
});

// Documentation (JSDoc)
gulp.task('docs', ['scripts'], function() {
  return gulp
    .src(srcFiles, {cwd: base, read: false})
    .pipe(jsdoc(require('./jsdoc.json')));
});


// WATCHERS
gulp.task('watch', function() {

  gulp.watch([
      '../src/client/app/components/**/*.scss',
      '../src/client/app/sass/**/*.scss',
      '../src/client/app/shared/directives/**/*.scss'
    ],
    ['css']
  );

  gulp.watch([
    '../src/client/app/components/**/*.js',
    '../src/client/app/shared/**/*.js',
    '../src/client/app/app.js'
  ], ['lint', 'style', 'docs', 'scripts']);

  gulp.watch('../src/client/app/**/*.tpl.html', ['lint', 'style', 'docs', 'scripts']);

  gulp.watch(['../src/client/app/index.html'], ['html']);

});


// Unit Testing
gulp.task('test', ['karma'], function(done) {
  gulp.start('clean-template');
});

gulp.task('karma', ['templates'], function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('templates', function() {
  return gulp
    .src('templates.js')
    .pipe(addStream.obj(prepareTemplates()))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('tmp/js'));
});

// Angular Template Cache
function prepareTemplates() {
  return gulp.src('src/client/app/**/*.tpl.html', {cwd: base})
    .pipe(angularTemplateCache());
}
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

