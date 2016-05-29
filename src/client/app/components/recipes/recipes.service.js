/**
 *
 * RECIPES COMPONENT SERVICE
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @description Provides service for the recipes section component
 *
 * @memberof app.Recipes
 *
 */

(function() {

  'use strict';

  angular.module('project.recipes')

  // Declare Component Data Service
    .service('RecipesDataService', RecipesDataService);

  // Define dependancies
  RecipesDataService.$inject = ['$http', 'API_URL'];

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

}());
