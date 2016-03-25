/**
 *
 * USER COMPONENT
 *
 * @description
 *  Provides user functionality for the site, including directives
 *
 * @class app.User
 * @memberof app
 *
 * @todo :
 *
 *  - form error validation to return error on non successful login with messaging
 *
 */

(function() {

  'use strict';

  angular.module('project.user', [])

    .service('UserService', UserService)

    .directive('userMenuTopBar', userMenuTopBar);

  // Inject Deps
  UserService.$inject = ['$http'];
  userMenuTopBar.$inject = ['$window', '$location'];

  /**
   *
   * User Controller
   *
   * @constructor
   */
  function UserService($http) {

    var user = user || {};

    /**
     *
     */
    return {
      user: user
    };

    /**
     *
     * @returns {user|{}}
     */
    function getUser() {
      return user;
    }
  }

  /**
   *
   * User Directive : Top Bar
   *
   * @returns {{replace: boolean, restrict: string, template: string, link: link}}
   *
   */
  function userMenuTopBar($window, $location) {

    return {
      replace: true,
      restrict: 'AE',
      //scope: {
      //    logout: '='
      //},

      templateUrl: './site/components/user/templates/user-menu-top-bar.html',

      link: function(scope, elem, attrs) {

        // Logout User
        //scope.logout = function () {
        //
        //    console.log("LOGGED OUT");
        //
        //    // Delete JWT token
        //    localStorage.removeItem('aat-auth-token');
        //
        //    // Check to see if token
        //    console.log(localStorage.getItem('aat-auth-token'));
        //
        //    // Redirect
        //    $location.path("/frontend");
        //
        //};

      }
    };
  }

}());
