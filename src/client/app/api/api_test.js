'use strict';

describe('project.api module', function() {

    var APIobj;

    //var userEndpoint = '/api/user';

    beforeEach(module('project.api'));

    beforeEach(inject(function (API) {
        APIobj = API;
    }));


    describe('Constructor', function () {

        it('assigns a endpoint variable', function () {
            expect(APIobj.userEndpoint).toBeDefined();
        });

    });



    //describe('API Service', function(){
    //    //
    //    //it('should ....', inject(function($service) {
    //    //
    //    //    // Spec body
    //    //    var API = $service('API');
    //    //
    //    //    expect(API).toBeDefined();
    //    //
    //    //}));
    //
    //});
});