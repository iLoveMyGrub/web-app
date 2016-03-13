/**
 *
 * ABOUT COMPONENT
 *
 * @file
 * Provides functionality for the section
 *
 */


'use strict';

angular.module('project.about', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/about', {
            pageTitle: 'About ',
            templateUrl: './site/components/about/about.tpl.html',
            controller: 'AboutController',
            controllerAs: 'vm'
        });

    }])

    .controller('AboutController', AboutController);

/**
 *
 * About Controller
 *
 * @constructor
 */
function AboutController() {

    var vm = this;

}