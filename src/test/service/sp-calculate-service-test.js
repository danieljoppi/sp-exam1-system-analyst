'use strict';

describe('Service: SpCalculateService', function () {

    var service, factory;
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
    });

    it('test 1 department saler and itens', function() {
        expect(service).toBeDefined();
    });
});
