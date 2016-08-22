/***
 *
 * AUTH COMPONENT
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @class project.Auth
 *
 * @description Provides user auth functionality for the site for use with AWS Cognito
 *
 * @memberof project.Auth
 *
 */

(function() {

  'use strict';

  angular.module('project.auth')

    .service('AuthService', AuthService);

  // Inject Deps
  AuthService.$inject = ['$window', '$q'];

  /**
   *
   * Auth Token Service
   *
   * @param {object} $window
   * @returns {{getToken: getToken, setToken: setToken}}
   * @constructor
   *
   *
   */
  function AuthService($window, $q) {

    // @see : http://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html
    // @see : http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html

    AWSCognito.config.region = 'eu-west-1'; //This is required to derive the endpoint

    // @todo : move to constants.js
    var poolData = {
      UserPoolId: 'eu-west-1_EjhwcamGs',
      ClientId: '5po0fhgn0j3qn4ob2sluq7unnj',
    };

    var authStatus = false;
    var store = $window.sessionStorage;
    var key = 'auth-token';

    return {
      tokenStatus: tokenStatus,
      getToken: getToken,
      setToken: setToken,
      authStatus: authStatus,
      createUser: createUser,
      authenticateUser: authenticateUser

    };

    /**
     *
     * Get the stored local token
     *
     */
    function tokenStatus() {
      var token = store.getItem(key);
      if (token) {
        return true;
      } else {
        return false;
      }
    }

    /**
     *
     * Get the stored local token
     *
     */
    function getToken() {
      var token = store.getItem(key);
      if (token) {
        return token;
      } else {
        return false;
      }
    }

    /**
     *
     * Set the stored local token
     *
     * @param {string} token
     */
    function setToken(token) {
      console.log('setToken called');
      if (token) {
        // Set user object + profile
        UserService.setUser(token);
        // Store JWT
        store.setItem(key, token);
      } else {
        store.removeItem(key);
      }
    }

    /**
     * Create User
     *
     * @param {object} user
     */
    function createUser(user) {

      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

      var attributeList = [];

      var dataEmail = {
        Name: 'email',
        Value: user.email
      };
      //var dataPhoneNumber = {
      //  Name: 'phone_number',
      //  Value: user.phoneNumber
      //};
      var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
      //var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

      attributeList.push(attributeEmail);
      //attributeList.push(attributePhoneNumber);

      userPool.signUp(user.email, user.password, attributeList, null, function(err, result) {
        if (err) {
          alert(err);
          return;
        }
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
      });

    }

    /**
     * Authenticate User
     *
     * @param {string} username
     * @param {string} password
     *
     */
    function authenticateUser(id, password) {

      var authenticationData = {
        Username: id,
        Password: password
      };
      var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
      var userData = {
        Username: id,
        Pool: userPool
      };

      var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

      return $q(function(resolve, reject) {

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function(result) {
            // store token
            //console.log('access token + ' + result.getAccessToken().getJwtToken());
            resolve(result.getAccessToken().getJwtToken());
          },

          onFailure: function(err) {
            reject(err);
            //throw err;
          }

        });

      });

    }

  }

}());
