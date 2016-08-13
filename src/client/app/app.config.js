/**
 *
 * WEB APP CONFIG
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @namespace project
 *
 */

(function() {

  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('project')

  // App config
    .config([

      '$routeProvider',
      '$locationProvider',
      '$httpProvider',
      'jwtInterceptorProvider',

      function($routeProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {

        // use the HTML5 History API (only set in the main app.js not individual routes...)
        if (window.history && window.history.pushState) {
          $locationProvider.html5Mode(true);
        }

        //$httpProvider.interceptors.push('AuthInterceptor');
        $routeProvider.otherwise({redirectTo: '/frontpage'});

        // Add JWT Token to each request
        jwtInterceptorProvider.tokenGetter = function() {
          return sessionStorage.getItem('auth-token');
        };
        $httpProvider.interceptors.push('jwtInterceptor');

        // Google Maps
        //uiGmapGoogleMapApi.configure({
        //    //    key: 'your api key',
        //    v: '3.20', //defaults to latest 3.X anyhow
        //    libraries: 'weather,geometry,visualization'
        //});

      }])

    // App constants (ref env vars)
    .constant('API_URL', 'https://api.ilovemygrub.com/api/')
    // s3
    .constant('MEDIA_URL', 'https://s3-eu-west-1.amazonaws.com/www.ilovemygrub.com/files/s3fs-public')
    // sessionStorage ID
    .constant('TOKEN_ID', 'cms-content')

    .run(appRun);

  // Dep Inject
  appRun.$inject = [
    '$rootScope', '$location', '$http', 'store', 'jwtHelper', '$window', 'AuthTokenService', 'UserService'
  ];

  /**
   *
   * App RUN scope
   *
   * @param {object} $rootScope
   * @param {object} $location
   * @param {object} $http
   * @param {object} store
   * @param {object} jwtHelper
   * @param {object} $window
   * @param {object} AuthTokenService
   * @param {object} UserService
   */
  function appRun($rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on('$routeChangeStart', function(event, next, previous) {

      // Check token
      var token = sessionStorage.getItem('auth-token');

      // next.access.requiresLogin == true && $rootSscope.authUser == null
      if (next.access.requiresLogin === true) {

        if (!token) {
          console.log('REQUIRES AUTH...');
          //event.preventDefault();
          $location.path('/login');
        }

      }

    });

    // Handle Default Titles
    $rootScope.page = {
      setTitle: function(title) {
        this.pageTitle = title + ' | iLoveMyGrub.com';
      }
    };

    // Page Title
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      if (current.hasOwnProperty('$$route')) {
        $rootScope.pageTitle = current.$$route.pageTitle + ' | iLoveMyGrub.com';
        $rootScope.metaDescription = current.$$route.metaDescription;
      }
    });

  }

}());
