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

        function ($routeProvider, $locationProvider) {

            // use the HTML5 History API (only set in the main app.js not individual routes...)
            if (window.history && window.history.pushState) {
                $locationProvider.html5Mode(true);
            }

            //$httpProvider.interceptors.push('AuthInterceptor');
            $routeProvider.otherwise({redirectTo: '/frontpage'});



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
appRun.$inject = ['$rootScope'];

/**
 *
 * App RUN scope
 *
 * @param $rootScope
 * @param $location
 * @param $cookieStore
 * @param $http
 */

function appRun($rootScope) {

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
