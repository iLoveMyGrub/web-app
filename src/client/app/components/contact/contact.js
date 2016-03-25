/***
 *
 *  contact Module
 *
 */

'use strict';


angular.module('project.contact', ['ngRoute','formly', 'formlyBootstrap'])

    // Route
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/contact', {

            title: 'Contact',
            templateUrl: './site/components/contact/contact.tpl.html',
            controller: 'ContactController',
            controllerAs: 'vm'

        });



    }])


    .controller('ContactController', ContactController);




/**
 *
 * About Controller
 *
 * @constructor
 */
function ContactController(){

    var vm = this;

    vm.user = {};

    vm.onSubmit = onSubmit;

    vm.env = {
        angularVersion: angular.version.full
        //formlyVersion: formlyVersion
    };

    vm.model = {};
    vm.options = {};


    // http://docs.angular-formly.com/v6.4.0/docs/custom-templates
    vm.fields = [
        {
            key: 'marvel1',
            type: 'select',
            templateOptions: {
                label: 'Normal Select',
                options: [
                    {name: 'Iron Man', value: 'iron_man'},
                    {name: 'Captain America', value: 'captain_america'},
                    {name: 'Black Widow', value: 'black_widow'},
                    {name: 'Hulk', value: 'hulk'},
                    {name: 'Captain Marvel', value: 'captain_marvel'}
                ]
            }
        },
        {
            key: 'first_name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'First Name',
                placeholder: 'Enter your first name',
                required: false
            }
        },
        {
            key: 'last_name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Last Name',
                placeholder: 'Enter your last name',
                required: false
            }
        },
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                type: 'email',
                label: 'Email address',
                placeholder: 'Enter email',
                required: false
            }
        },

        {
            key: 'checked',
            type: 'checkbox',
            templateOptions: {
                label: 'Check me out'
            }
        }
    ];


    function onSubmit() {

        var formSubmitted = true;

        alert(JSON.stringify(vm.model), null, 2);

    }



}






