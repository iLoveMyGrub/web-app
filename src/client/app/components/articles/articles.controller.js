/**
 *
 * ARTICLES COMPONENT CONTROLLER
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

  // Declare Component Controller
    .controller('ArticlesController', ArticlesController)

    // Declare Component Data Controller
    .controller('ArticlesDetailController', ArticlesDetailController);

  // Define deps
  ArticlesController.$inject = ['ArticlesDataService'];
  ArticlesDetailController.$inject = ['ArticlesDataService', '$routeParams'];

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

