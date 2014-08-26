'use strict';

describe('Service: SpRestService', function () {

    var service;
    // load the service's module
    beforeEach(function(){

        // load the module.
        module('spexam');

        // inject service for testing.
        inject(function(SpRestService) {
            service = SpRestService;
        });
    });


    it('have REST Service', function() {
        expect(service).toBeDefined();

        // test POST Method
        var post = service.post('user', {name: 'daniel.joppi'});
        expect(post.code).toBe(200);
        expect(post.result.name).toBe('daniel.joppi');

        // test object null
        var post = service.post('user', null);
        expect(post.code).toBe(409);

        // test undefined type
        var post = service.post(null, {name: 'some'});
        expect(post.code).toBe(409);
    });
});
