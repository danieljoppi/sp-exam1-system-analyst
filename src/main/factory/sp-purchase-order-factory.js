/**
 * Fake Factory for simulation purchase order.
 *
 * Created by daniel.joppi on 26/08/14.
 */
(function(ng, app) {

    "use strict";

    app.factory('SpPurchaseOrderFactory', function() {
        var config_default = {
            numItens: 1,
            numDepartamentItens: 1
            numSales: 1,
            numDepartamentSales: 1
        };
        var config = ng.copy(config_default);

        // default departaments
        var departaments =[
            {id: 1, name: 'depto 1', percent: 10.0},
            {id: 2, name: 'depto 2', percent: 12.5},
            {id: 3, name: 'depto 3', percent: 15.0},
            {id: 4, name: 'depto 4', percent: 20.0}
        ]
        return {
            /**
             * Method to configure generate purchase order.
             *
             * @param config_ JSON with configuration for factory.
             */
            setConfig : function(config_) {
                config = ng.copy(config_default);
                if (!config_){ return this; }
                if (config_.numItens) {
                    config.numItens = config_.numItens;
                }
                if (config_.numSales) {
                    config.numSales = config_.numSales;
                }
                if (config_.numDepartamentItens) {
                    config.numDepartamentItens = config_.numDepartamentItens;
                }
                if (config_.numDepartamentSales) {
                    config.numDepartamentSales = config_.numDepartamentSales;
                }
                return this;
            },
            generate : function() {
                var order = {
                    itens: [],
                    sales: [],
                    codeNF: ''+Math.floor((Math.random() * 100000)),
                    total: 0.0
                };
                // generate item list
                for (var i=0; i<config.numItens; i++) {
                    var item = {
                        // random item value - between 1 - 11,00
                        value: (Math.floor((Math.random() * 1000))/100)+1,
                        name: 'item '+i,
                        // with item has 1 departament
                        departament: departaments[i % config.numDepartamentItens]
                    };
                    // sum item value
                    order.total += item.value;
                    // add item
                    order.itens.push(item);
                }
                // generate sales list
                for (var i=0; i<config.numSales; i++) {
                    var sale = {
                        name: 'sale '+i,
                        // with sale has 2 departament
                        departament: departaments[i % config.numDepartamentSales]
                    };
                    // add sale
                    order.sales.push(sale);
                }
                return order;
            }
        };
    });

})(angular, spExam);