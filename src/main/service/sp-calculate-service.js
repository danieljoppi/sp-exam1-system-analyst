/**
 * Created by daniel.joppi on 26/08/14.
 */
(function(ng, app) {

    "use strict";

    app.service('SpCalculateService', function() {

        // service is just a constructor function
        // that will be called with 'new'

        this.sayHello = function(name) {
            return "Hi " + name + "!";
        };
    });

})(angular, spExam);