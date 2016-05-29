/**
 *
 * ARTICLES COMPONENT SERVICE
 *
 * @description
 * Provides functionality for the articles section
 *
 * @memberof app.Articles
 *
 */

(function() {

  'use strict';

  angular.module('project.articles')

  // Declare Component Data Service
    .service('ArticlesDataService', ArticlesDataService);

  // Define deps
  ArticlesDataService.$inject = ['$http', 'API_URL'];

  /**
   *
   * Articles Data Service
   *
   * @param $http
   * @constructor
   *
   *
   */
  function ArticlesDataService($http, API_URL) {

    // Data Endpoints
    var listingsAPI = API_URL + 'views/feed_articles?limit=250&page=0';
    var detailsAPI = API_URL + 'views/feed_articles_details?filters[nid]=';

    return {
      getDetailsData: getDetailsData,
      //getNewsRelatedData: getNewsRelatedData,
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

