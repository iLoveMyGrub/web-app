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

angular.module('project.login', ['ngRoute', 'formly', 'formlyBootstrap', 'angular-jwt', 'project.auth'])

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

LoginController.$inject = ['LoginDataService', 'jwtHelper', '$location', '$window', 'AuthTokenService'];


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
function LoginController(LoginDataService, jwtHelper, $location, $window, AuthTokenService) {

    var vm = this;

    vm.user = {};

    vm.onSubmit = onSubmit;

    vm.env = {
        angularVersion: angular.version.full
        //formlyVersion: formlyVersion
    };

    vm.model = {};
    vm.options = {};


    // Check token
    var token = sessionStorage.getItem('auth-token');

    if (token) {
        vm.authUser = jwtHelper.decodeToken(token);

        //// Redirect if token i.e logged in
        $window.location = '/dashboard';
        $window.location.reload();
    }


    // http://docs.angular-formly.com/v6.4.0/docs/custom-templates
    vm.fields = [

        {
            key: 'email',
            type: 'input',
            templateOptions: {
                type: 'email',
                label: 'Email',
                placeholder: 'Please enter your username',
                required: true
            }
        },
        {
            key: 'password',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Password',
                placeholder: 'Please enter your password',
                required: true
            }
        }

    ];


    /**
     *
     *
     *
     */
    function logout() {

        alert("logged out from controller...!");

    }


    /**
     *
     * Login form Submit handler
     *
     */
    function onSubmit() {

        var formSubmitted = true;

        console.log("ctrl : ", AuthTokenService);

        LoginDataService.login(vm.model.email, vm.model.password)
            .then(function success(response) {

                // Redirect if succesful login
                $window.location.href = '#/dashboard';
                $window.location.reload();
            });

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
