angular.module('locationService', ['ngResource'])
    .factory('Location', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/location/:uuid", {
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    })
    .factory('LocationService', function(Location) {

        return {

            /**
             * Fetches Locations
             *
             * @param params to search against
             * @returns $promise of array of matching Locations (REST ref representation by default)
             */
            getLocations: function(params) {
                return Location.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    });
            }
        }
    });