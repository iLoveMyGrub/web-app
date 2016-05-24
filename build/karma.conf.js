// Karma configuration
// Generated on Tue Mar 15 2016 09:04:35 GMT+0000 (GMT)

module.exports = function(config) {

  var files = require('./includes/vendor.js');
  var sourceFiles = require('./includes/source.js');
  for (var i = 0; i < sourceFiles.length; i++) {
    files.push(sourceFiles[i]);
  }
  files.push(
    "build/tmp/js/templates.js",
    "src/client/bower_components/angular-mocks/angular-mocks.js",
    "src/client/app/**/*spec.js"
  );

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: files,

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/client/app/**/!(*spec).js': 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'progress', 'junit', 'coverage'],

    junitReporter: {
      outputDir: 'build/test/logs',
      outputFile: 'junit.xml',
    },

    coverageReporter: {
      dir: 'build/test/logs/coverage',
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'cobertura', subdir: 'xml'}
      ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    captureTimeout: 60000,

    browserDisconnectTimeout : 10000,
    browserDisconnectTolerance : 1,
    browserNoActivityTimeout : 60000,

  });
};
