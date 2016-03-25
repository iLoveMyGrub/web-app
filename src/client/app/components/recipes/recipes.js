/**
 *
 * RECIPES COMPONENT
 *
 * @description
 * Provides functionality for the section component
 *
 * @class app.Recipes
 *
 * @memberof app
 *
 */

(function() {

  'use strict';

  angular.module('project.recipes', ['ngRoute', 'angularUtils.directives.dirPagination'])

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

    }])

    // Declare Component Data Service
    .service('RecipesDataService', RecipesDataService)

    // Declare Component Controller
    .controller('RecipesController', RecipesController)

    // Declare Component Detail Controller
    .controller('RecipesDetailController', RecipesDetailController);

  // Define dependancies
  RecipesDataService.$inject = ['$http', 'API_URL'];
  RecipesController.$inject = ['RecipesDataService'];
  RecipesDetailController.$inject = ['RecipesDataService', '$routeParams'];

  /**
   *
   * Recipes Data Service
   *
   * @param $http
   * @constructor
   *
   *
   */
  function RecipesDataService($http, API_URL) {

    // Data Endpoints
    var listingsAPI = API_URL + 'views/feed_recipes?limit=250&page=0';
    var detailsAPI = API_URL + 'views/feed_recipes_details?filters[nid]=';

    return {
      getDetailsData: getDetailsData,
      getListingsData: getListingsData
    };

    /**
     *
     * Get Detail Page
     *
     * @returns {*}
     */
    function getDetailsData(id) {

      return $http.get(detailsAPI + id,
        {cache: true})
        .then(dataComplete)
        .catch(dataFailed);

      function dataComplete(response) {
        return response.data;
      }

      function dataFailed(error) {
        console.log('XHR Failed for getListingsData.' + error.data);
      }
    }

    //function getNewsRelatedData() {
    //
    //    console.log("EventsDataService.getEventsData");
    //
    //    return $http.get("http://www.omdbapi.com/?t=" + term + "&tomatoes=true&plot=full")
    //        .then(dataComplete)
    //        .catch(dataFailed);
    //
    //    function dataComplete(response) {
    //        console.log("complete called");
    //        return response.data;
    //    }
    //
    //    function dataFailed(error) {
    //        console.log('XHR Failed for getNewsRelatedData.' + error.data);
    //    }
    //}

    /**
     *
     * Get Listings Data
     *
     * @returns {*}
     */
    function getListingsData() {

      return $http.get(listingsAPI, {cache: true})
        .then(dataComplete)
        .catch(dataFailed);

      function dataComplete(response) {
        return response.data;
      }

      function dataFailed(error) {
        console.log('XHR Failed for getListingsData.' + error.data);
      }
    }

  }

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
