angular.module('session', ['ngResource'])

    /*
     * This is just the resource, named this way for consistency with other things in uicommons
     */
    .factory('Session', [ "$resource", function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH + "/ws/rest/v1/appui/session");
    }])

    .factory('SessionInfo', [ "Session", function(Session) {
        var cached = null;
        return {
            get: function() {
                if (!cached) {
                    cached = Session.get();
                }
                return cached;
            },
            logout: function() {
                Session.delete();
            }
        }
    }])