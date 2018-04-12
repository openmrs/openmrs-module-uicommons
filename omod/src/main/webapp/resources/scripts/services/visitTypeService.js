angular.module('visitTypeService', ['ngResource','uicommons.common'])
    .factory('VisitType', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/visittype/:uuid", {
            uuid: '@uuid'
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    })
    .factory('VisitTypeService', function(VisitType, RestService) {

        return {

            /**
             * Fetches VisitTypes
             *
             * @param params to search against
             * @returns $promise of array of matching VisitTypes (REST ref representation by default)
             */
            getVisitTypes: function(params) {
                return RestService.getAllResults(VisitType, params);
            }
        }
    });