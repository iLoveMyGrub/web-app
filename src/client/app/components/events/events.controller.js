/**
 *
 * EVENTS COMPONENT CONTROLLER
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @description
 * This module handles all the functionality for the section.
 *
 * @memberof app.EVENTS
 *
 */

(function() {

  'use strict';

  angular.module('project.events')

  // Setup controller function
    .controller('EventsController', EventsController)

    .controller('EventsDetailController', EventsDetailController);

  EventsController.$inject = ['EventsDataService', 'API_URL', 'MEDIA_URL'];

  EventsDetailController.$inject = ['EventsDataService', '$routeParams', 'API_URL', 'MEDIA_URL'];

  /**
   *
   * Events Controller
   *
   * @param $http
   * @constructor
   */
  function EventsController(EventsDataService, MEDIA_URL) {

    var vm = this;

    // data not loaded
    vm.loading = true;
    vm.mediaUrl = MEDIA_URL;
    vm.listings = [];

    // Call main controller function
    activate();

    /**
     * Controller main funciton
     *
     * @returns {*}
     */
    function activate() {

      return getEventsData().then(function() {
        //console.log('Activated Event View');
      });

    }

    /**
     *
     * Call Data Service
     *
     * @returns {Array}
     */
    function getEventsData() {

      var content = [];

      content = EventsDataService.getListingsData()

        .then(function(data) {

          vm.listings = data;
          // data loaded
          vm.loading = false;

          return vm.listings;
        })
        .catch(console.log.bind(console));

      return content;
    }

  }

  /**
   *
   * Events Detail Controller
   *
   * @param $http
   * @constructor
   *
   */
  function EventsDetailController(EventsDataService, $routeParams, API_URL, MEDIA_URL) {

    var vm = this;

    // Map Data
    vm.map = {
      center: {
        latitude: 53.2501435,
        longitude: -0.4775298
      },
      zoom: 14,
      options: {
        scrollwheel: false
      },
      marker: {
        id: 0,
        coords: {
          latitude: 40.1451,
          longitude: -99.6680
        }
      }
    };

    vm.loading = true;
    vm.details = [];
    vm.geocode = {};
    vm.id = $routeParams.id;

    // Call main controller function
    activate();

    /**
     * Controller main funciton
     *
     * @returns {*}
     */
    function activate() {

      return getEventsData(vm.id).then(function() {
        //console.log('Activated Event View ' + vm.id);
      }).catch(console.log.bind(console));

    }

    /**
     *
     * Geocode Postcode
     *
     * @param postcode
     * @returns {*}
     */
    function getGeocodePostcode(postcode) {

      return EventsDataService.getGeocodePostcode(postcode)
        .then(dataComplete)
        .catch(dataFailed);

      function dataComplete(response) {
        return response;
      }

      function dataFailed(error) {
        console.log('XHR Failed for getGeocodePostcode. ' + error.data);
      }

    }

    /**
     *
     * Call Data Service
     *
     * @returns {Array}
     */
    function getEventsData(id) {

      var content = [];

      // Get the event data
      content = EventsDataService.getDetailsData(id)

      // Get Data from the API about the Event.
        .then(function(data) {

          vm.details = data;

          //console.log('postcode ' + vm.details[0].postcode);

          return vm.details;
        })
        .catch(console.log.bind(console))

        // Do a look up to get lat + long (geocode) for the returned Postcode
        .then(function(data) {

          var eventPostcode = data[0].postcode;

          // Call Google Geocode
          getGeocodePostcode(eventPostcode)

            .then(function(geodata) {

              vm.map.center.latitude = geodata.results[0].geometry.location.lat;
              vm.map.center.longitude = geodata.results[0].geometry.location.lng;
              vm.map.marker.coords.latitude = geodata.results[0].geometry.location.lat;
              vm.map.marker.coords.longitude = geodata.results[0].geometry.location.lng;

              //console.log('LATLONG ->', vm.map.center);

              return geodata;

            })
            .catch(console.log.bind(console));

          vm.loading = false;

        })
        .catch(console.log.bind(console));

      return content;
    }

  }

}());
