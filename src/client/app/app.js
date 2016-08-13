/**
 *
 * WEB APP
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @namespace project
 *
 */

(function() {

  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('project', [

    // VENDOR
    'ngRoute',
    'templates',
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
    'project.recipes',
    'project.dashboard',
    'project.contact',
    'project.static-pages',
    'mobile-menu'

  ]);

  // Precompile .tpls
  angular.module('templates', []);

}());
