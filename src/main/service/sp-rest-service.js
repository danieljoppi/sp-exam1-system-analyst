/**
 * Created by daniel.joppi on 25/08/14.
 */
(function(ng, app) {

    "use strict";

    app.service('SpRestService', function() {

        return {
            sayHello : function(name) {
                return "Hi " + name + "!";
            }
        }
    });

})(angular, spExam);