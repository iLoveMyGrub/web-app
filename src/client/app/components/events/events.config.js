/**
 *
 * EVENTS COMPONENT CONFIG
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @description
 * This module handles all the functionality for the section.
 *
 * @memberof app.Events
 *
 */

(function() {

  'use strict';

  angular.module('project.events')

  // Provide router info for component
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/food-events', {
        pageTitle: 'Food Events',
        metaDescription: 'Latest food events in London and the UK',
        templateUrl: 'components/events/events.tpl.html',
        controller: 'EventsController',
        controllerAs: 'vm',
        access: {
          requiresLogin: false,
          roles: []
        }
      });

      $routeProvider.when('/food-events/:id', {
        pageTitle: 'Event Details ',
        templateUrl: 'components/events/events-detail.tpl.html',
        controller: 'EventsDetailController',
        controllerAs: 'vm',
        access: {
          requiresLogin: false,
          roles: []
        }
      });

    }]);

}());
