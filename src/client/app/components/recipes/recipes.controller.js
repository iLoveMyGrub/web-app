/**
 *
 * RECIPES COMPONENT
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @description Provides functionality for the recipes section component
 *
 * @memberof app.Recipes
 *
 */

(function() {

  'use strict';

  angular.module('project.recipes')

    // Declare Component Controller
    .controller('RecipesController', RecipesController)

    // Declare Component Detail Controller
    .controller('RecipesDetailController', RecipesDetailController);

  // Define dependancies
  RecipesController.$inject = ['RecipesDataService'];
  RecipesDetailController.$inject = ['RecipesDataService', '$routeParams'];

  /**
   *
   * Recipes Controller
   *
   * @param $http
   * @constructor
   *
   */
  function RecipesController(RecipesDataService) {

    var vm = this;

    vm.loading = true;
    vm.listings = [];

    // Call main controller function
    activate();

    /**
     *
     * Main Controller Function
     *
     * @returns {*}
     */
    function activate() {

      return getListingsData().then(function() {
        //console.log(' -- Activated Data View');
      });

    }

    /**
     *
     * Get Listings Data
     *
     * @returns {Array}
     */
    function getListingsData() {

      var content = [];

      content = RecipesDataService.getListingsData()

        .then(function(data) {

          vm.listings = data;
          vm.loading = false;

          return vm.listings;
        });

      return content;
    }

  }

  /**
   *
   * Events Detail Controller
   *
   * @param $http
   * @constructor
   *
   */
  function RecipesDetailController(RecipesDataService, $routeParams, API_URL, MEDIA_URL) {

    var vm = this;

    vm.loading = true;
    vm.details = [];

    vm.id = $routeParams.id;

    // Call main controller function
    activate();

    /**
     * Controller main funciton
     *
     * @returns {*}
     */
    function activate() {

      return getRecipesData(vm.id).then(function() {
        //console.log('Activated Event View ' + vm.id);
      });

    }

    /**
     *
     * Call Data Service
     *
     * @returns {Array}
     */
    function getRecipesData(id) {

      var content = [];

      content = RecipesDataService.getDetailsData(id)

        .then(function(data) {

          vm.details = data;
          vm.loading = false;

          return vm.details;
        });

      return content;
    }

  }

}());
