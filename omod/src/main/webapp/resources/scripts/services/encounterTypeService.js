console.log("Defining encounterTypeService");

angular.module('encounterTypeService', ['ngResource'])
    .factory('EncounterType', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/encountertype/:uuid", {
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    })
    .factory('EncounterTypeService', function(EncounterType) {

        return {

            /**
             * Fetches EncounterTypes
             *
             * @param params to search against
             * @returns $promise of array of matching EncounterTypes (REST ref representation by default)
             */
            getEncounterTypes: function(params) {
                return EncounterType.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    }, emr.handleNotLoggedIn);
            }


        }
    });