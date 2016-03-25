/***
 *
 *  AUTH COMPONENT
 *
 * @file
 *  Provides auth functionality for the site for use with login/logout/forms components
 *
 *
 */

'use strict';

angular.module('project.auth', ['angular-jwt'])
  .service('AuthTokenService', AuthTokenService);

// Inject Deps
AuthTokenService.$inject = ['$window'];

/**
 *
 * Auth Token Service
 *
 * @param $window
 * @returns {{getToken: getToken, setToken: setToken}}
 * @constructor
 *
 *
 */
function AuthTokenService($window) {

  console.log("AuthTokenService");

  var store = $window.localStorage;
  var key = 'aat-auth-token';

  return {
    getToken: getToken,
    setToken: setToken

  };

  /**
   *
   * Get the stored local token
   *
   */
  function getToken() {
    return store.getItem(key);
  }


  /**
   *
   * Set the stored local token
   *
   * @param token
   */
  function setToken(token) {
    if (token) {
      store.setItem(key, token);
    } else {
      store.removeItem(key);
    }
  }


}
