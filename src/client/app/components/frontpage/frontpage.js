/**
 *
 * FRONTPAGE COMPONENT
 *
 * @file
 * Provides functionality for the section
 *
 */


'use strict';

angular.module('project.frontpage', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/frontpage', {
            pageTitle: 'Welcome',
            metaDescription: 'Latest food events, features, reviews and recipes',
            templateUrl: './site/components/frontpage/frontpage.tpl.html',
            controller: 'FrontpageController',
            controllerAs: 'vm',
            access: {
                requiresLogin: false,
                roles: []
            }
        });
    }])


    // Define controller
    .controller('FrontpageController', FrontpageController);


/**
 *
 * Frontpage Controller
 *
 * @constructor
 */
function FrontpageController() {
    var vm = this;
}