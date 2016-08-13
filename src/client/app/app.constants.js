/**
 *
 * WEB APP CONSTANTS
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @memberof project
 *
 */
(function() {

  'use strict';

  var API_URL = '';

  // Setup DOB data arrays
  var dayArray = [];
  for (var i = 1; i <= 31; i++) {
    dayArray.push({name: i, value: i});
  }

  var monthArray = [];
  for (var j = 1; j <= 12; j++) {
    monthArray.push({name: j, value: j});
  }

  var yearArray = [];
  for (var k = 1916; k <= 2016; k++) {
    yearArray.push({name: k, value: k});
  }

  // Ng
  angular.module('project')

  // API URL's
    .constant('API_URL', API_URL)

    // Global Date of Birth Object
    .constant('AWS_CONFIG', Object.freeze({
      'AWSCognito': {
        'region': 'eu-west-1',
        'userPoolId': 'eu-west-1_3dsEdxxvB20',
        'clientId': 'ej0o055bv4mebsogu4vqpuxxar0'
      }
    }))

    // App constants (ref env vars)
    .constant('API_URL', 'https://api.ilovemygrub.com/')
    // s3
    .constant('MEDIA_URL', 'https://s3-eu-west-1.amazonaws.com/www.ilovemygrub.com/files/s3fs-public')
    // sessionStorage ID
    .constant('TOKEN_ID', 'cms-content')

    // Global Date of Birth Object
    .constant('DOB', Object.freeze({
      'day': dayArray,
      'month': monthArray,
      'year': yearArray
    }))

    // Generic form title field
    .constant('SALUTATION_TITLES', Object.freeze([
      'Mr',
      'Mrs',
      'Miss',
      'Ms'
    ]));

})();
