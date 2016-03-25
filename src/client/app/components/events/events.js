/**
 *
 * EVENTS COMPONENT
 *
 * @file
 * This module handles all the functionality for the section.
 *
 */

'use strict';


angular.module('project.events', [
    'ngRoute',
    'angularUtils.directives.dirPagination',
    'meta'

    ])

    // Provide router info for component
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/food-events', {
            pageTitle: 'Food Events',
            metaDescription: 'Latest food events in London and the UK',
            templateUrl: './site/components/events/events.tpl.html',
            controller: 'EventsController',
            controllerAs: 'vm',
            config: {
                roles: ['news', 'auth']
            }
        });

        $routeProvider.when('/food-events/:id', {
            pageTitle: 'Event Details ',
            templateUrl: './site/components/events/events-detail.tpl.html',
            controller: 'EventsDetailController',
            controllerAs: 'vm',
            config: {
                roles: ['news', 'auth']
            }
        });

    }])

    // Setup data service function
    .service('EventsDataService', EventsDataService)

    // Setup controller function
    .controller('EventsController', EventsController)

    .controller('EventsDetailController', EventsDetailController);


// Setup injectables
EventsDataService.$inject = ['$http', 'API_URL'];

EventsController.$inject = ['EventsDataService', 'API_URL', 'MEDIA_URL'];

EventsDetailController.$inject = ['EventsDataService', '$routeParams', 'API_URL', 'MEDIA_URL'];


/**
 *
 * Events Data Service
 *
 * @param $http
 * @constructor
 */
function EventsDataService($http, API_URL) {


    var listingsAPI = API_URL + "views/feed_events?limit=250&page=0";
    var detailsAPI = API_URL + "views/feed_events_details?filters[nid]=";

    //feed_events_details


    return {
        getDetailsData: getDetailsData,
        getListingsData: getListingsData,
        getGeocodePostcode: getGeocodePostcode
    };


    /**
     *
     * Get Detail Page
     *
     * @returns {*}
     */
    function getDetailsData(id) {

        return $http.get(detailsAPI + id,
            {cache: true})
            .then(dataComplete)
            .catch(dataFailed);

        function dataComplete(response) {
            console.log("complete called");
            return response.data;
        }

        function dataFailed(error) {
            console.log('XHR Failed for getListingsData.' + error.data);
        }
    }


    /**
     *
     * Get Geocode Postcode
     *
     * @returns {*}
     */
    function getGeocodePostcode(postcode) {

        //var geocoderEndpoint = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=ln24rd,+UK&";
        var geocoderEndpoint = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=";

        var postcodeParsed = postcode + ",+UK";

        return $http.get(geocoderEndpoint + postcodeParsed,
            {cache: true})
            .then(dataComplete)
            .catch(dataFailed);

        function dataComplete(response) {
            console.log("complete called..." + response);
            return response.data;
        }

        function dataFailed(error) {
            console.log('XHR Failed for getListingsData.' + error.data);
        }
    }


    //function getNewsRelatedData() {
    //
    //    console.log("EventsDataService.getEventsData");
    //
    //    return $http.get("http://www.omdbapi.com/?t=" + term + "&tomatoes=true&plot=full")
    //        .then(dataComplete)
    //        .catch(dataFailed);
    //
    //    function dataComplete(response) {
    //        console.log("complete called");
    //        return response.data;
    //    }
    //
    //    function dataFailed(error) {
    //        console.log('XHR Failed for getNewsRelatedData.' + error.data);
    //    }
    //}

    /**
     *
     * Get Listings Data
     *
     * @returns {*}
     */
    function getListingsData() {

        console.log("EventsDataService.getListingsData");

        return $http.get(listingsAPI, {cache: true})
            .then(dataComplete)
            .catch(dataFailed);

        function dataComplete(response) {
            console.log("complete called");
            return response.data;
        }

        function dataFailed(error) {
            console.log('XHR Failed for getListingsData.' + error.data);
        }
    }


};


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
    vm.media_url = MEDIA_URL;
    vm.listings = [];

    console.log("Events controller");

    // Call main controller function
    activate();

    /**
     * Controller main funciton
     *
     * @returns {*}
     */
    function activate() {

        return getEventsData().then(function () {
            console.log('Activated Event View');
        });

    }

    /**
     *
     * Call Data Service
     *
     * @returns {Array}
     */
    function getEventsData() {

        console.log("controller closure");

        var content = [];


        content = EventsDataService.getListingsData()

            .then(function (data) {

                vm.listings = data;

                // data loaded
                vm.loading = false;

                console.log("controller listings data caller");

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

        return getEventsData(vm.id).then(function () {
            console.log('Activated Event View ' + vm.id);
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

        //Get the Lat + Long from Postcode

        console.log("Call getGeocodePostcode");

        return EventsDataService.getGeocodePostcode(postcode)
            .then(dataComplete)
            .catch(dataFailed);

        function dataComplete(response) {
            console.log("getGeocodePostcode complete called", response);
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
            .then(function (data) {

                vm.details = data;

                //
                console.log("postcode " + vm.details[0].postcode);

                return vm.details;
            })
            .catch(console.log.bind(console))

            // Do a look up to get lat + long (geocode) for the returned Postcode
            .then(function (data) {

                var eventPostcode = data[0].postcode;

                // Call Google Geocode
                getGeocodePostcode(eventPostcode)

                    .then(function (geodata) {

                        vm.map.center.latitude = geodata.results[0].geometry.location.lat;
                        vm.map.center.longitude = geodata.results[0].geometry.location.lng;

                        vm.map.marker.coords.latitude = geodata.results[0].geometry.location.lat;
                        vm.map.marker.coords.longitude = geodata.results[0].geometry.location.lng;


                        console.log("LATLONG ->", vm.map.center);

                        return geodata;

                    })
                    .catch(console.log.bind(console));

                console.log("data postcode ", eventPostcode);


                vm.loading = false;

            })
            .catch(console.log.bind(console));


        return content;
    }


}

