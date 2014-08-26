/**
 * Created by daniel.joppi on 26/08/14.
 */
(function(ng, app) {

    "use strict";

    app.factory('SpDemandRequestFactory', function() {

        // factory returns an object
        // you can run some code before

        return {
            sayHello : function(name) {
                return "Hi " + name + "!";
            }
        }
    });

})(angular, spExam);