/**
 * Fake REST Service API, for simulate backend integration.
 *
 * Created by daniel.joppi on 25/08/14.
 */
(function(ng, app) {

    "use strict";

    app.service('SpRestService', function() {

        return {
            /**
             * Fake Method POST for insert or update database.
             *
             * @param type of object to insert or update in database.
             * @param obj JSON that contanins the object date.
             * @returns JSON: HTTP 200 to success and HTTP 409 for error in process request.
             */
            post : function(type, obj) {
                if (type && obj) {
                    return {code: 200, result: obj};

                } else {
                    return {code: 409, error: (!type ? 'type not defined' : 'object is null')};
                }
            },
            /**
             * Fake Method for select objects in database.
             * @param type of object to select in database.
             * @param param JSON with filters.
             * @returns JSON: HTTP 200 to success and HTTP 409 for error in process request.
             */
            get : function(type, param) {
                if (type && param) {
                    return {code: 200, result: param};

                } else {
                    return {code: 409, error: (!type ? 'type not defined' : 'object is null')};
                }
            }
        };
    });

})(angular, spExam);