/**
 * ACCOUNT COMPONENT CONFIG
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>

 * @class project.Account
 *
 * @memberof project
 *
 */
(function() {
  'use strict';

  angular.module('project.account')
    .config(['$routeProvider', function($routeProvider) {

      $routeProvider
        .when('/sign-in', {
          templateUrl: 'components/account/sign-in/account.sign-in.tpl.html',
          controller: 'AccountSignInController',
          controllerAs: 'vm'
        })
        .when('/forgotten', {
          templateUrl: 'components/account/forgotten/account.forgotten.tpl.html',
          controller: 'AccountForgottenController',
          controllerAs: 'vm'
        })
        .when('/reset/:token', {
          templateUrl: 'components/account/reset/account.reset.tpl.html',
          controller: 'AccountResetController',
          controllerAs: 'vm'
        })
        .when('/register', {
          templateUrl: 'components/account/register/account.register.tpl.html',
          controller: 'AccountRegisterController',
          controllerAs: 'vm'
        });

    }]);

})();
