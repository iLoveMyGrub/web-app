/**
 *
 * News Module
 *
 */

'use strict';


angular.module('project.news', ['ngRoute'])

    //
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/news', {
            title: 'News',
            templateUrl: './site/components/news/news.html',
            controller: 'NewsController',
            controllerAs: 'vm',
            config: {
                roles: [
                    'news',
                    'auth'
                ]
            }
        });
    }])

    //


    .service('NewsDataService', NewsDataService)

    .controller('NewsController', NewsController);

NewsDataService.$inject = ['$http'];

NewsController.$inject = ['NewsDataService'];

/**
 *
 * News Data Service
 *
 * @param $http
 * @constructor
 */
function NewsDataService($http) {


    var listingsAPI = "http://localhost:1337/_YOUR_DATA_PROXY_";

    var term = "Sherlock Holmes";

    return {
        //getNewsData: getNewsData,
        //getNewsRelatedData: getNewsRelatedData,
        getListingsData: getListingsData
    };


    //function getNewsData() {
    //
    //
    //    console.log("NewsDataService.getNewsData");
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
    //        console.log('XHR Failed for getNewsData.' + error.data);
    //    }
    //}
    //
    //function getNewsRelatedData() {
    //
    //    console.log("NewsDataService.getNewsData");
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

        console.log("NewsDataService.getListingsData");

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
function NewsController(NewsDataService) {

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

        content = NewsDataService.getNewsData()

            .then(function (data) {

                vm.news = data;

                console.log("controller news data caller");

                return vm.news;
            });

        content = NewsDataService.getListingsData()

            .then(function (data) {

                vm.listings = data;

                console.log("controller news data caller");

                return vm.listings;
            });


        return content;
    }


};

