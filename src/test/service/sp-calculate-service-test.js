'use strict';

describe('Service: SpCalculateService', function () {

    var service, factory;
    // load the service's module
    beforeEach(function(){

        // load the module.
        module('spexam');

        // inject service for testing.
        inject(function(SpCalculateService, SpPurchaseOrderFactory) {
            service = SpCalculateService;
            factory = SpPurchaseOrderFactory;
        });
    });

    it('should have a service', function() {
        expect(service).toBeDefined();
    });

    it('test 1 saler and 10 itens for same department', function() {
        var order = factory.setConfig({numItens: 10}).generate();
        expect(service).toBeDefined();
        var registers = service.calcCommissionRequest(order);
        expect(registers.length).toBe(1);
        var register = registers[0];
        expect(register.codeNF).toBe(order.codeNF);
        expect(register.totalNF).toBe(order.total);
        // check value of commission is calculated
        expect(register.valCommission).toBeDefined();
    });

    it('test 4 saler and 50 itens in 4 department', function() {
        var config = {
            numItens: 50,
            numDepartmentItens: 4,
            numSales: 4,
            numDepartmentSales: 4
        };
        var order = factory.setConfig(config).generate();
        var registers = service.calcCommissionRequest(order);
        expect(registers.length).toBe(4);
        for (var i=0; i<registers.length; i++) {
            var register = registers[i];
            expect(register.codeNF).toBe(order.codeNF);
            expect(register.totalNF).toBe(order.total);
        }
    });

    it('test 5 saler and 50 itens in 4 department', function() {
        var config = {
            numItens: 50,
            numDepartmentItens: 4,
            numSales: 5,
            numDepartmentSales: 4
        };
        var order = factory.setConfig(config).generate();
        var error;
        try {
            var registers = service.calcCommissionRequest(order);
            // never test this case
            expect(registers.length).toBe(4);
        } catch(e) {
            error = e;
        }
        expect(error).toBe('error: no calculate commission for two or more sale with same department');
    });

    it('test 3 saler and 50 itens in 4 department', function() {
        var config = {
            numItens: 50,
            numDepartmentItens: 4,
            numSales: 3,
            numDepartmentSales: 3
        };
        var order = factory.setConfig(config).generate();
        var error;
        try {
            var registers = service.calcCommissionRequest(order);
            // never test this case
            expect(registers.length).toBe(4);
        } catch(e) {
            error = e;
        }
        expect(error).toBe('error: invalid item [item 3]');
    });

    it('test 4 saler and 50 itens in 3 department', function() {
        var config = {
            numItens: 50,
            numDepartmentItens: 3,
            numSales: 4,
            numDepartmentSales: 4
        };
        var order = factory.setConfig(config).generate();
        var error;
        try {
            var registers = service.calcCommissionRequest(order);
            // never test this case
            expect(registers.length).toBe(4);
        } catch(e) {
            error = e;
        }
        expect(error).toBe('error: invalid order - has one or more sale - no sell any item');
    });
});
