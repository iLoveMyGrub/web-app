/***
 *
 *  LOGIN COMPONENT
 *
 * @file
 *  Provides login section and functionality for the site, including directives
 *
 * @todo :
 *
 *  - Style the login header and replace hardcoded profile image size with CSS sizes
 *  - Get real Auth0 creds, replace my test ones
 *  - Remove any unused login stuff from here
 *
 */

'use strict';

angular.module('project.login', ['ngRoute', 'formly', 'formlyBootstrap'])

    .service('LoginDataService', LoginDataService)

    .service('LoginService', LoginService)

    .directive('loginDirectiveTopLinks', loginDirectiveTopLinks)


// Inject Deps

LoginDataService.$inject = ['$http', '$rootScope', 'API_URL', 'jwtHelper', '$window', 'AuthTokenService'];

LoginService.$inject = ['$http', 'auth', 'store', '$location'];


/**
 *
 * Login Directive : Top Bar
 *
 * @returns {{replace: boolean, restrict: string, template: string, link: link}}
 *
 */
function loginDirectiveTopLinks($window, $location) {

    return {
        replace: true,
        restrict: 'AE',
        controller: LoginController,
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: 'site/components/login/templates/login-top-bar.html',
        link: function (scope, elem, attrs) {

            // Logout User
            scope.logout = function () {

                console.log("LOGGED OUT");

                // Delete JWT token
                sessionStorage.removeItem('auth-token');

                // Check to see if token
                console.log(sessionStorage.getItem('auth-token'));

                // Redirect
                $location.path("/frontend");

            };

        }
    }

}

function LoginService($http, auth, store, $location){

  return {
    login: login,
    logout: logout
  };

  function login(){
    auth.signin({}, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/login');
    }, function () {
      // Error callback
      console.log("There was an error logging in", error);
    });
  }

  function logout(){
    auth.signout();
    store.remove('profile');
    store.remove('token');
  }

}

/**
 *
 * Login Data Service
 *
 * @constructor
 */
function LoginDataService($http, $rootScope, API_URL, jwtHelper, $window, AuthTokenService) {


    return {
        login: login,
        logout: logout,
        getUser: getUser
    };

    /**
     *
     * @param username
     * @param password
     * @returns {*}
     */
    function login(email, password) {


        console.log(AuthTokenService);

        return $http.post(API_URL + '/auth', {

            email: email,
            password: password


        }).then(function success(response) {

            console.log(AuthTokenService);

            AuthTokenService.setToken(response.data);

            return response;

        });
    }


    function logout(){


    }

    /**
     *
     * Get the current User (@todo : maybe move ?)
     *
     * @returns {*}
     */
    function getUser() {

        console.log("get-user");

        if (AuthTokenService.getToken()) {

            return $http.get(API_URL + '/me');

        } else {

            return $q.reject({data: 'client has no auth token'});

        }
    }

}
