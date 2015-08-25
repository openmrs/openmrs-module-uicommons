angular.module('providerAttributeTypeService', ['ngResource'])
    .factory('ProviderAttributeType', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/providerattributetype/:uuid", {
            uuid: '@uuid'
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    })
    .factory('ProviderAttributeTypeService', function(ProviderAttributeType) {

        return {

            /**
             * Fetches ProviderAttributeTypes
             *
             * @param params to search against
             * @returns $promise of array of matching ProviderAttributeTypes (REST ref representation by default)
             */
            getProviderAttributeTypes: function(params) {
                return ProviderAttributeType.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    }, emr.handleNotLoggedIn);
            }
        }
    });