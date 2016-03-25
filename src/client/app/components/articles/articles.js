/**
 *
 * ARTICLES COMPONENT
 *
 * @description
 * Provides functionality for the section
 *
 * @class app.Articles
 *
 * @memberof app
 *
 */

(function() {

  'use strict';

  angular.module('project.articles', ['ngRoute', 'angularUtils.directives.dirPagination'])

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

    }])

    // Declare Component Data Service
    .service('ArticlesDataService', ArticlesDataService)

    // Declare Component Controller
    .controller('ArticlesController', ArticlesController)

    // Declare Component Data Controller
    .controller('ArticlesDetailController', ArticlesDetailController);

  // Define deps
  ArticlesDataService.$inject = ['$http', 'API_URL'];
  ArticlesController.$inject = ['ArticlesDataService'];
  ArticlesDetailController.$inject = ['ArticlesDataService', '$routeParams'];

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

  /**
   *
   * Articles Controller
   *
   * @param $http
   * @constructor
   *
   */
  function ArticlesController(ArticlesDataService) {

    var vm = this;
    // data not loaded
    vm.loading = true;
    vm.listings = [];

    // Call Controller Main Function
    activate();

    /**
     *
     * Controller Main Function
     *
     * @returns {*}
     */
    function activate() {

      return getListingsData().then(function() {
        console.log(' -- Activated Data View');
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

      content = ArticlesDataService.getListingsData()

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
   * Details Controller
   *
   * @param $http
   * @constructor
   *
   */
  function ArticlesDetailController(ArticlesDataService, $routeParams, API_URL, MEDIA_URL) {

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

      return getArticlesData(vm.id).then(function() {
        console.log('Activated Event View ' + vm.id);
      });

    }

    /**
     *
     * Call Data Service
     *
     * @returns {Array}
     */
    function getArticlesData(id) {

      var content = [];

      content = ArticlesDataService.getDetailsData(id)

        .then(function(data) {

          vm.details = data;
          vm.loading = false;

          return vm.details;
        });

      return content;
    }

  }

}());

