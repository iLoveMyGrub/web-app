/***
 *
 *  LOGIN COMPONENT
 *
 * @file
 *  Provides login section and functionality for the site, including directives
 *
 * @todo :
 *
 *  - form error validation to return error on non successful login with messaging
 *
 */

'use strict';

angular.module('project.login', ['ngRoute', 'formly', 'formlyBootstrap'])

    // Route
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/login', {

            title: 'Login',
            templateUrl: './site/components/login/login.tpl.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            access: {
                requiresLogin: false,
                roles: []
            }

        });

    }])

    .service('LoginDataService', LoginDataService)

    .directive('loginDirectiveTopLinks', loginDirectiveTopLinks)

    .controller('LoginController', LoginController);


// Inject Deps
loginDirectiveTopLinks.$inject = ['$window', '$location'];

LoginDataService.$inject = ['$http', '$rootScope', 'API_URL', 'jwtHelper', '$window', 'AuthTokenService'];

LoginController.$inject = ['$http', 'auth', 'store', '$location'];


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

/**
 *
 * Login Controller
 *
 * @constructor
 *
 */
function LoginController($http, auth, store, $location) {

    var vm = this;

    vm.login = function () {
      auth.signin({}, function (profile, token) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/');
      }, function () {
        // Error callback
        console.log("There was an error logging in", error);
      });
    }

    vm.logout = function() {
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
