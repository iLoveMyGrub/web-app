/**
 *
 * RECIPES COMPONENT CONFIG
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @description Provides config for the recipes section component
 *
 * @memberof app.Recipes
 *
 */

(function() {

  'use strict';

  angular.module('project.recipes')

  // Component config
    .config(['$routeProvider', function($routeProvider) {

      //
      $routeProvider.when('/recipes', {
        pageTitle: 'Recipes',
        metaDescription: 'Latest food recipes',
        templateUrl: 'components/recipes/recipes.tpl.html',
        controller: 'RecipesController',
        controllerAs: 'vm',
        access: {
          requiresLogin: false,
          roles: []
        }
      });

      //
      $routeProvider.when('/recipes/:id', {
        pageTitle: 'Recipe Detail',
        templateUrl: 'components/recipes/recipes-detail.tpl.html',
        controller: 'RecipesDetailController',
        controllerAs: 'vm',
        access: {
          requiresLogin: false,
          roles: []
        }
      });

    }]);

}());
