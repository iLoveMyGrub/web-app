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
        'angular-jwt',
        'angular-storage',
        'formly',
        'formlyBootstrap',
        'uiGmapgoogle-maps',

        // CUSTOM
        'project.auth',
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
        '$httpProvider',
        'jwtInterceptorProvider',

        function ($routeProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {

            // use the HTML5 History API (only set in the main app.js not individual routes...)
            if (window.history && window.history.pushState) {
                $locationProvider.html5Mode(true);
            }

            //$httpProvider.interceptors.push('AuthInterceptor');
            $routeProvider.otherwise({redirectTo: '/frontpage'});

            // Add JWT Token to each request
            jwtInterceptorProvider.tokenGetter = function () {
                return sessionStorage.getItem('auth-token');
            }
            $httpProvider.interceptors.push('jwtInterceptor');

            // Google Maps
            //uiGmapGoogleMapApi.configure({
            //    //    key: 'your api key',
            //    v: '3.20', //defaults to latest 3.X anyhow
            //    libraries: 'weather,geometry,visualization'
            //});

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
appRun.$inject = ['$rootScope', '$location', '$http', 'store', 'jwtHelper', '$window', 'AuthTokenService', 'UserService'];

/**
 *
 * App RUN scope
 *
 * @param $rootScope
 * @param $location
 * @param $cookieStore
 * @param $http
 */

function appRun($rootScope, $location, $http, store, jwtHelper, $window, AuthTokenService, UserService) {

    //console.log("UserService - RUN_> ", UserService);
    //console.log("AuthTokenService - RUN_> ", AuthTokenService);

    // register listener to watch route changes
    $rootScope.$on("$routeChangeStart", function (event, next, current) {

        // Check token
        var token = sessionStorage.getItem('auth-token');

        if (token) {
            console.log("@RUN -- " + jwtHelper.decodeToken(token));
        }

        console.log(next);

        // next.access.requiresLogin == true && $rootSscope.authUser == null

        if (next.access.requiresLogin == true) {

            console.log("@RUN - " - token);

            if (!token) {
                console.log("REQUIRES Login + user has no JWT token...");
                event.preventDefault();
                $location.path("/login");
            }

        }

    });


    $rootScope.page = {
        setTitle: function (title) {
            this.pageTitle = title + ' | iLoveMyGrub.com';
        }
    }


    // Page Title
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

        if (current.hasOwnProperty('$$route')) {
            $rootScope.pageTitle = current.$$route.pageTitle + " | iLoveMyGrub.com";
            $rootScope.metaDescription = current.$$route.metaDescription;
        }
    });

}
