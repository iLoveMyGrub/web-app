/**
 *
 * META MODULE
 *
 * @file Handles page meta data content i.e. MetaTags, PageTitle and Socials...
 *
 */

'use strict';

angular.module('meta', [])

    // Define services 
    .service('MetaTagsService', MetaTagsService);


// Define Injectables
MetaTagsService.$inject = [];



/**
 *
 * PageTitle Service
 */
function MetaTagsService() {

    var title = 'iLoveMyGrub.com | Foodie Goodness'
    var metaDescription = '';
    var metaKeywords = '';

    return {
        title: function () {
            return title;
        },
        setTitle: function (newTitle) {
            title = newTitle;
        },
        metaDescription: function () {
            return metaDescription;
        },
        metaKeywords: function () {
            return metaKeywords;
        },
        reset: function () {
            metaDescription = '';
            metaKeywords = '';
        },
        setMetaDescription: function (newMetaDescription) {
            metaDescription = newMetaDescription;
        },
        appendMetaKeywords: function (newKeywords) {
            for (var key in newKeywords) {
                if (metaKeywords === '') {
                    metaKeywords += newKeywords[key].name;
                } else {
                    metaKeywords += ', ' + newKeywords[key].name;
                }
            }
        }
    };

}


//
//<meta name="description" content="{{ MetaInformation.metaDescription() }}">
//    <meta name="keywords" content="{{ MetaInformation.metaKeywords() }}">