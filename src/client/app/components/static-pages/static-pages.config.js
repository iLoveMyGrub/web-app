/**
 *
 * STATIC PAGES COMPONENT CONFIG
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @description This component provides the flat / static house content for the app.
 *
 * @memberof app.StaticPages
 *
 */

(function() {

  'use strict';

  angular.module('project.static-pages')

    .config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {

        $routeProvider.when('/terms', {
          title: 'Terms and Conditions',
          templateUrl: 'components/static-pages/terms.tpl.html'

        });

        $routeProvider.when('/privacy-policy', {
          title: 'Privacy Policy',
          templateUrl: 'components/static-pages/privacy-policy.tpl.html'

        });

        $routeProvider.when('/about', {
          title: 'About',
          templateUrl: 'components/static-pages/about.tpl.html'

        });

      }]);

}());

