/**
 * Service that performs calculations for the system.
 *
 * Created by daniel.joppi on 26/08/14.
 */
(function(ng, app) {

    "use strict";

    app.service('SpCalculateService', function() {
        return {
            /**
             * Method that calculates the commission for a purchase order.
             *
             * @param order JSON that contains the object with the given purchase order.
             * @returns List of JSON with contains data from the calculation of the commission by department.
             */
            calcCommissionRequest : function(order){
                if (!order) {
                    throw "error: not defined order for calculation";
                }
                if (!order.itens || order.itens.length <= 0) {
                    throw "error: list itens is empty"
                }
                if (!order.sales || order.sales.length <= 0) {
                    throw "error: list sales is empty"
                }
//                if (order.sales.length > 1) {
//                    throw "error: default calculating commission for one sale, and no more";
//                }
                var departments = [];
                // check sales ... 1 for department
                for (var i=0; i<order.sales.length; i++) {
                    var sale = order.sales[i];
                    var dep = sale.department;
                    if (departments[dep.id] == null) {
                        departments[dep.id] = dep;
                        dep.valTotalItens = 0.0;
                    } else {
                        throw "error: no calculate commission for two or more sale with same department";
                    }
                }
                // check itens ... for same departments of sales
                var deps_check = [];
                for (var i=0; i<order.itens.length; i++) {
                    var item = order.itens[i];
                    var dep = departments[item.department.id];
                    if (dep == null) {
                        throw "error: invalid item ["+item.name+"]";
                    } else if (deps_check[dep.id] == null) {
                        deps_check[dep.id] = item.department;
                    }
                    // calculate total itens value for department
                    dep.valTotalItens += item.value;
                }
                if (deps_check.length != departments.length) {
                    throw "error: invalid order - has one or more sale - no sell any item";
                }
                var registers = [];
                for (var i=0; i<order.sales.length; i++) {
                    var sale = order.sales[i];
                    var dep = sale.department;
                    // register calculation commission
                    var register = {
                        // Numero da NF
                        codeNF: order.codeNF,
                        // Nome do Representante de Vendas
                        nameSale: sale.name,
                        // Departamento
                        department: dep,
                        // Porcentagem da Comissao
                        commissionPercent: dep.percent,
                        // Venda Bruta Comissionada
                        valTotalItens: departments[dep.id].valTotalItens,
                        // Valor Total da NF
                        totalNF: order.total
                    };
                    if (order.sales.length == 1) {
                        // Comissao Liquida
                        register.valCommission = register.valTotalItens * (register.percent/100);
                     }
                     registers.push(register);
                }
                return registers;
            }
        };
    });

})(angular, spExam);