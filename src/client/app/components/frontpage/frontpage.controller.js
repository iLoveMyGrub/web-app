/**
 *
 * FRONTPAGE COMPONENT CONTROLLER
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @description
 * This module handles all the functionality for the section.
 *
 * @memberof app.frontpage
 *
 */

(function() {

  'use strict';

  angular.module('project.frontpage')

  // Setup controller function
    .controller('FrontpageController', FrontpageController);

  FrontpageController.$inject = [];

  /**
   *
   * frontpage Controller
   *
   * @param $http
   * @constructor
   */
  function FrontpageController() {

    var vm = this;

  }

}());
