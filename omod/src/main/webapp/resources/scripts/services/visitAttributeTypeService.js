angular.module('visitAttributeTypeService', ['ngResource'])
    .factory('VisitAttributeType', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/visitattributetype/:uuid", {
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    })
    .factory('VisitAttributeTypeService', function(VisitAttributeType) {

        return {

            /**
             * Fetches VisitAttributeTypes
             *
             * @param params to search against
             * @returns $promise of array of matching EncounterTypes (REST ref representation by default)
             */
            getVisitAttributeTypes: function(params) {
                return VisitAttributeType.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    }, emr.handleNotLoggedIn);
            }
        }
    });