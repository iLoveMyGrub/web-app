/**
 * ACCOUNT COMPONENT
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @class project.Account.AccountSignInController
 *
 * @memberof project.Account
 *
 */
(function() {
  'use strict';

  angular
    .module('project.account')
    .controller('AccountSignInController', AccountSignInController);

  // Inject dependencies
  AccountSignInController.$inject = ['AuthService','$location'];

  /**
   * AccountSignInController
   * @param AuthService
   * @constructor
   */
  function AccountSignInController(AuthService, $location) {

    var vm = this;
    vm.model = {};
    vm.errorMessage = null;
    vm.onSubmit = onSubmit;

    /**
     *
     * Login form Submit handler
     *
     */
    function onSubmit(form) {
      if (form) {

        AuthService
          .authenticateUser(vm.model.email, vm.model.password, function(error, response) {})
          .then(function(response) {
            vm.model = {};
            //redirect to /acccount
            console.log(response);
            $location.path('/dashboard');
          }, function(response) {

            console.log('custom error - ' + response);
            //vm.message = response.data.message;
            vm.errorMessage = 'Error : ' + response;
            //vm.model.password = '';
          })
          .finally(function() {
            vm.accountSignIn.$setPristine();
            vm.accountSignIn.$setUntouched();
          });
      }
    }

  }

})();
