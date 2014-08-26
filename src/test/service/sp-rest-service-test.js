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


    it('test POST - REST Service', function() {
        expect(service).toBeDefined();

        // test POST Method
        var resp = service.post('user', {name: 'daniel.joppi'});
        expect(resp.code).toBe(200);
        expect(resp.result.name).toBe('daniel.joppi');

        // test object null
        resp = service.post('user', null);
        expect(resp.code).toBe(409);

        // test undefined type
        resp = service.post(null, {name: 'some'});
        expect(resp.code).toBe(409);
    });


    it('test GET - REST Service', function() {
        expect(service).toBeDefined();

        // test POST Method
        var resp = service.get('user', {name: 'daniel.joppi'});
        expect(resp.code).toBe(200);
        expect(resp.result.name).toBe('daniel.joppi');

        // test object null
        resp = service.get('user', null);
        expect(resp.code).toBe(409);

        // test undefined type
        resp = service.get(null, {name: 'some'});
        expect(resp.code).toBe(409);
    });
});
