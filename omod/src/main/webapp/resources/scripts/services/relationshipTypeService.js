angular.module('relationshipTypeService', ['ngResource'])
    .config(function ($httpProvider) {
        // to prevent the browser from displaying a password pop-up in case of an authentication error
        $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = 'true';
    })
    .factory('RelationshipType', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/relationshiptype/:uuid", {
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    })
    .factory('RelationshipTypeService', function(RelationshipType) {

        return {

            /**
             * Fetches RelationshipTypes
             *
             * @param params to search against
             * @returns $promise of array of matching RelationshipTypes (REST ref representation by default)
             */
            getRelationshipTypes: function(params) {
                return RelationshipType.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    }, emr.handleNotLoggedIn);
            }
        }
    });