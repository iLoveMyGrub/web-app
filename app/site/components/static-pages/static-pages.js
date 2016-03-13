/**
 *
 * STATIC PAGES COMPONENT
 *
 * @file
 * This component provides the flat / static house content for the app.
 *
 *
 */


'use strict';

angular.module('project.static-pages', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/terms', {
            title: 'Terms and Conditions',
            templateUrl: './site/components/static-pages/terms.tpl.html',
            //controller: 'StaticPagesController',
            //controllerAs: 'vm'
        });

        $routeProvider.when('/privacy-policy', {
            title: 'Privacy Policy',
            templateUrl: './site/components/static-pages/privacy-policy.tpl.html',
            //controller: 'StaticPagesController',
            //controllerAs: 'vm'
        });

    }]);

