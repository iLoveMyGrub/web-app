/***
 *
 * APP JS
 *
 * @file
 * This is the main application component and is responsible for the bootstrapping and loading.
 *
 *
 */


'use strict';

// Declare app level module which depends on views, and components
angular.module('project', [

        // VENDOR
        'ngRoute',
        'ngSanitize',
        'auth0',
        'angular-jwt',
        'angular-storage',
        'formly',
        'formlyBootstrap',
        'uiGmapgoogle-maps',

        // CUSTOM
        'project.login',
        'project.register',
        'project.user',
        'project.frontpage',
        'project.events',
        'project.articles',
        'project.reviews',
        'project.recipes',
        'project.news',
        'project.about',
        'project.dashboard',
        'project.contact',
        'project.static-pages',
        'project.api',

        // SHARED
        'mobile-menu'

    ])

    // App config
    .config([

        '$routeProvider',
        '$locationProvider',
        'authProvider',

        function ($routeProvider, $locationProvider, authProvider) {

            // use the HTML5 History API (only set in the main app.js not individual routes...)
            if (window.history && window.history.pushState) {
                $locationProvider.html5Mode(true);
            }

            $routeProvider.otherwise({redirectTo: '/frontpage'});

            authProvider.init({
              domain: 'clarelindley.eu.auth0.com',
              clientID: 'XPUc5aeq04kBbgdU1EMVnjojTn9agJBs'
            });


        }])

    // App constants (ref env vars)
    //.constant('API_URL', 'http://ilmg-web-prod-env.elasticbeanstalk.com/api/')
    .constant('API_URL', 'http://api.ilovemygrub.com/api/')
    // s3
    .constant('MEDIA_URL', 'https://s3-eu-west-1.amazonaws.com/www.ilovemygrub.com/files/s3fs-public')
    // sessionStorage ID
    .constant('TOKEN_ID', 'cms-content')

    .run(appRun);

//
appRun.$inject = ['$rootScope', 'auth', 'store', 'jwtHelper', '$location', 'LoginService'];

/**
 *
 * App RUN scope
 *
 * @param $rootScope
 * @param auth The Auth0 Object
 * @param store
 * @param jwtHelper
 * @param $location
 * @param LoginService
 */

function appRun($rootScope, auth, store, jwtHelper, $location, LoginService) {

    // This hooks all auth events to check everything as soon as the app starts
    auth.hookEvents();

    // To keep the user logged in, retrieve the token from localStorage on each page refresh and let
    // auth0-angular know the user is already authenticated:
    $rootScope.$on('$locationChangeStart', function() {
      var token = store.get('token');
      if (token) { // if there's a token
        if (!jwtHelper.isTokenExpired(token)) { // and it's not expired
          if (!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token);
          }
        } else {
          // Either show the login page or use the refresh token to get a new idToken
          $location.path('/login');
        }
      }
    });

    $rootScope.page = {
        setTitle: function (title) {
            this.pageTitle = title + ' | iLoveMyGrub.com';
        }
    }

    // Make the Login functions global by adding them to the rootScope
    $rootScope.login = LoginService.login;
    $rootScope.logout = LoginService.logout;
    $rootScope.auth = auth;


    // Page Title
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

        if (current.hasOwnProperty('$$route')) {
            $rootScope.pageTitle = current.$$route.pageTitle + " | iLoveMyGrub.com";
            $rootScope.metaDescription = current.$$route.metaDescription;
        }
    });

}
