/**
 *
 * News Module
 *
 */

'use strict';


angular.module('project.reviews', ['ngRoute'])

    //
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reviews', {
            title: 'Reviews',
            templateUrl: './site/components/reviews/reviews.tpl.html',
            controller: 'ReviewsController',
            controllerAs: 'vm',
            config: {
                roles: ['news', 'auth']
            }
        });
    }])

    //


    .service('ReviewsDataService', ReviewsDataService)

    .controller('ReviewsController', ReviewsController);

ReviewsDataService.$inject = ['$http'];

ReviewsController.$inject = ['ReviewsDataService'];

/**
 *
 * News Data Service
 *
 * @param $http
 * @constructor
 */
function ReviewsDataService($http) {


    var listingsAPI = "http://localhost:1337/_YOUR_DATA_PROXY_";

    var term = "Sherlock Holmes";

    return {
        getNewsData: getNewsData,
        getNewsRelatedData: getNewsRelatedData,
        getListingsData: getListingsData
    };


    function getNewsData() {


        console.log("ReviewsDataService.getNewsData");

        return $http.get("http://www.omdbapi.com/?t=" + term + "&tomatoes=true&plot=full")
            .then(dataComplete)
            .catch(dataFailed);

        function dataComplete(response) {
            console.log("complete called");
            return response.data;
        }

        function dataFailed(error) {
            console.log('XHR Failed for getNewsData.' + error.data);
        }
    }

    function getNewsRelatedData() {

        console.log("ReviewsDataService.getNewsData");

        return $http.get("http://www.omdbapi.com/?t=" + term + "&tomatoes=true&plot=full")
            .then(dataComplete)
            .catch(dataFailed);

        function dataComplete(response) {
            console.log("complete called");
            return response.data;
        }

        function dataFailed(error) {
            console.log('XHR Failed for getNewsRelatedData.' + error.data);
        }
    }

    function getListingsData() {

        console.log("ReviewsDataService.getListingsData");

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
 * News Controller
 *
 * @param $http
 * @constructor
 */
function ReviewsController(ReviewsDataService) {

    var vm = this;

    vm.term = "News data";

    vm.news = [];

    vm.listings = [];

    console.log("news controller");

    activate();

    function activate() {

        return getNewsData().then(function () {
            console.log('Activated News View');
        });

    }


    function getNewsData() {

        console.log("controller closure");

        var content = [];

        content = ReviewsDataService.getNewsData()

            .then(function (data) {

                vm.news = data;

                console.log("controller news data caller");

                return vm.news;
            });

        content = ReviewsDataService.getListingsData()

            .then(function (data) {

                vm.listings = data;

                console.log("controller news data caller");

                return vm.listings;
            });


        return content;
    }


};

