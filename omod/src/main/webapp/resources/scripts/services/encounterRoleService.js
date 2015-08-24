angular.module('encounterRoleService', ['ngResource'])
    .factory('EncounterRole', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/encounterrole/:uuid", {
            uuid: '@uuid'
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    })
    .factory('EncounterRoleService', function(EncounterRole) {

        return {

            /**
             * Fetches EncounterRoles
             *
             * @param params to search against
             * @returns $promise of array of matching EncounterRoles (REST ref representation by default)
             */
            getEncounterRoles: function(params) {
                return EncounterRole.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    }, emr.handleNotLoggedIn);
            }
        }
    });