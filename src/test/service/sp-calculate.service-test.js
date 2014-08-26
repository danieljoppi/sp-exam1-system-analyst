'use strict';

describe('Service: SpCalculateService', function () {

    var service;
    // load the service's module
    beforeEach(function(){

        // load the module.
        module('spexam');

        // inject service for testing.
        inject(function(SpCalculateService) {
            service = SpCalculateService;
        });
    });


    it('should have a service', function() {
        expect(service).toBeDefined();
        console.log('service', service);
        expect(service.opa).toBe(3);
    });
});
