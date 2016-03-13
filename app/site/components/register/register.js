/***
 *
 *  register COMPONENT
 *
 * @file
 *  Provides register section and functionality for the site, including directives
 *
 * @todo :
 *
 *  - form error validation to return error on non successful register with messaging
 *
 */

'use strict';

angular.module('project.register', ['ngRoute', 'formly', 'formlyBootstrap', 'angular-jwt', 'project.auth'])

    // Route
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/register', {

            title: 'register',
            templateUrl: './site/components/register/register.tpl.html',
            controller: 'registerController',
            controllerAs: 'vm',
            access: {
                requiresregister: false,
                roles: []
            }

        });

    }])

    .service('registerDataService', registerDataService)
    
    .controller('registerController', registerController);


// Injectables
registerDataService.$inject = ['$http', '$rootScope', 'API_URL', 'jwtHelper', '$window', 'AuthTokenService'];
registerController.$inject = ['registerDataService', 'jwtHelper', '$location', '$window', 'AuthTokenService'];


/**
 *
 * register Controller
 *
 * @constructor
 *
 */
function registerController(registerDataService, jwtHelper, $location, $window, AuthTokenService) {

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
    var token = localStorage.getItem('aat-auth-token');

    if (token) {
        vm.authUser = jwtHelper.decodeToken(token);

        //// Redirect if token i.e logged in
        $window.location = '#/dashboard';
        $window.location.reload();
    }


    // http://docs.angular-formly.com/v6.4.0/docs/custom-templates
    vm.fields = [


        {
            key: 'first_name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'First name',
                placeholder: '',
                required: true
            }
        },
        {
            key: 'last_name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Last name',
                placeholder: '',
                required: true
            }
        },
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
     * register form Submit handler
     *
     */
    function onSubmit() {

        var formSubmitted = true;

        console.log("ctrl : ", AuthTokenService);

        registerDataService.register(vm.model.email, vm.model.password)
            .then(function success(response) {

                // Redirect if succesful register
                $window.location.href = '#/dashboard';
                $window.location.reload();
            });

    }


}

/**
 *
 * register Data Service
 *
 * @constructor
 */
function registerDataService($http, $rootScope, API_URL, jwtHelper, $window, AuthTokenService) {


    return {
        register: register,
        logout: logout,
        getUser: getUser
    };

    /**
     *
     * @param username
     * @param password
     * @returns {*}
     */
    function register(email, password) {


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
