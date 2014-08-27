'use strict';

describe('Factory: SpPurchaseOrderFactory', function () {

    var factory;
    // load the service's module
    beforeEach(function(){

        // load the module.
        module('spexam');

        // inject factory for testing.
        inject(function(SpPurchaseOrderFactory) {
            factory = SpPurchaseOrderFactory;
        });
    });

    it('test generate order', function() {
        expect(factory).toBeDefined();

        var order = factory.generate();
        expect(order.itens.length).toBe(1);
        expect(order.sales.length).toBe(1);
        expect(order.total).toBe(order.itens[0].value);

    });
});
