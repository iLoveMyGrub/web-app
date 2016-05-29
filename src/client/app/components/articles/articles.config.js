/**
 *
 * ARTICLES COMPONENT CONFIG
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @description
 * Provides functionality for the section
 *
 * @memberof app.Articles
 *
 */

(function() {

  'use strict';

  angular.module('project.articles')
  // Component config
    .config(['$routeProvider', function($routeProvider) {

      $routeProvider.when('/articles', {
        pageTitle: 'Articles',
        metaDescription: 'Latest food articles and news',
        templateUrl: 'components/articles/articles.tpl.html',
        controller: 'ArticlesController',
        controllerAs: 'vm',
        access: {
          requiresLogin: false,
          roles: []
        }
      });

      $routeProvider.when('/articles/:id', {
        pageTitle: 'Article Detail',
        templateUrl: 'components/articles/articles-detail.tpl.html',
        controller: 'ArticlesDetailController',
        controllerAs: 'vm',
        access: {
          requiresLogin: false,
          roles: []
        }
      });

    }]);

}());

