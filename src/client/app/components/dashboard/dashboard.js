/**
 *
 * DASHBOARD MODULE
 *
 * @description Provides a user dashboard for registered accounts
 *
 * @class app.Dashboard
 *
 * @memberof app
 *
 */

(function() {

  'use strict';

  angular.module('project.dashboard', ['ngRoute', 'angular-jwt'])

    //
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/dashboard', {
        title: 'dashboard',
        templateUrl: './site/components/dashboard/dashboard.tpl.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        access: {
          requiresLogin: true,
          roles: ['dashboard', 'auth']
        }
      });
    }])

    .service('DashboardDataService', DashboardDataService)
    .controller('DashboardController', DashboardController);

  DashboardDataService.$inject = ['$http', '$window', 'API_URL', 'jwtHelper'];
  DashboardController.$inject = ['DashboardDataService', 'API_URL', 'jwtHelper'];

  /**
   *
   * Dashboard Data Service
   *
   * @param $http
   * @constructor
   */
  function DashboardDataService($http, $window, API_URL, jwtHelper) {

    // Check token
    var token = localStorage.getItem('aat-auth-token');

    if (token) {
      var tokenPayload = jwtHelper.decodeToken(token);
      var uuid = tokenPayload.uuid;

      console.log(uuid);
    }

    return {
      getdashboardData: getdashboardData,
      //getListingsData: getListingsData
    };

    /**
     *
     *
     * @returns {*}
     */
    function getdashboardData() {

      return $http.get(API_URL + '/user/' + uuid)
        .then(dataComplete)
        .catch(dataFailed);

      /**
       *
       * @param response
       * @returns {*}
       */
      function dataComplete(response) {
        return response.data;
      }

      /**
       *
       *
       * @param error
       */
      function dataFailed(error) {
        console.log('XHR Failed for getdashboardData.' + error.data);
      }
    }

    /**
     *
     *
     * @returns {*}
     */
    function getListingsData() {

      /**
       *
       */
      return $http.get(listingsAPI, {cache: true})
        .then(dataComplete)
        .catch(dataFailed);

      /**
       *
       * @param response
       * @returns {*}
       */
      function dataComplete(response) {
        return response.data;
      }

      /**
       *
       * @param error
       */
      function dataFailed(error) {
        console.log('XHR Failed for getListingsData.' + error.data);
      }
    }
  }

  /**
   *
   * Dashboard Controller
   *
   * @param $http
   * @constructor
   */
  function DashboardController(DashboardDataService, API_URL, jwtHelper) {

    var vm = this;

    vm.term = 'dashboard data';
    vm.dashboard = [];
    vm.listings = [];

    //
    activate();

    /**
     *
     *
     * @returns {*}
     */
    function activate() {

      return getdashboardData().then(function() {
        console.log('Activated dashboard View');
      });

    }

    /**
     *
     *
     *
     * @returns {Array}
     */
    function getdashboardData() {

      var content = [];

      content = DashboardDataService.getdashboardData()

        .then(function(data) {

          vm.dashboard = data;

          return vm.dashboard;
        });

      return content;
    }

  }

}());
