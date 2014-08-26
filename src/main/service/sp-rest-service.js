/**
 * Created by daniel.joppi on 25/08/14.
 */
(function(ng, app) {

    "use strict";

    app.service('SpRestService', function() {

        // service is just a constructor function
        // that will be called with 'new'

        this.sayHello = function(name) {
            return "Hi " + name + "!";
        };
    });

})(angular, spExam);