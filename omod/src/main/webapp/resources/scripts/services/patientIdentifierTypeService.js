angular.module('patientIdentifierTypeService', ['ngResource'])
    .factory('PatientIdentifierType', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/patientidentifiertype/:uuid", {
            uuid: '@uuid'
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    })
    .factory('PatientIdentifierTypeService', function(PatientIdentifierType) {

        return {

            /**
             * Fetches PatientIdentifierTypes
             *
             * @param params to search against
             * @returns $promise of array of matching PatientIdentifierTypes (REST ref representation by default)
             */
            getPatientIdentifierTypes: function(params) {
                return PatientIdentifierType.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    }, emr.handleNotLoggedIn);
            }
        }
    });