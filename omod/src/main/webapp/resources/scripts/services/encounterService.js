angular.module('encounterService', ['ngResource', 'uicommons.common'])
    .factory('Encounter', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/encounter/:uuid", {
            uuid: '@uuid'
        },{
            query: { method:'GET', isArray:false } // OpenMRS RESTWS returns { "results": [] }
        });
    })
    .factory('EncounterService', function(Encounter) {

        return {

            /**
             * Fetches Encounters
             *
             * @param params to search against
             * @returns $promise of array of matching Encounters (REST ref representation by default)
             */
            getEncounters: function(params) {
                return Encounter.query(params).$promise.then(function(res) {
                    return res.results;
                });
            }
        }
    });