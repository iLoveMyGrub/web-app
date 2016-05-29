/**
 *
 * FRONTPAGE COMPONENT
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @description This module handles all the functionality for the section.
 *
 * @class app.Frontpage
 *
 * @memberof app
 *
 *
 */

(function() {

  'use strict';

  angular.module('project.frontpage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/frontpage', {
        pageTitle: 'Welcome',
        metaDescription: 'Latest food events, features, reviews and recipes',
        templateUrl: 'components/frontpage/frontpage.tpl.html',
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

}());

