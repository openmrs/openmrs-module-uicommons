angular.module('relationshipService', ['ngResource'])
    .config(function ($httpProvider) {
        // to prevent the browser from displaying a password pop-up in case of an authentication error
        $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = 'true';
    })
    .factory('Relationship', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/relationship/:uuid", {
            uuid: '@uuid'
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    })
    .factory('RelationshipService', function(Relationship) {

        return {

            /**
             * Fetches Relationships
             *
             * @param params to search against
             * @returns $promise of array of matching Relationships (REST ref representation by default)
             */
            getRelationships: function(params) {
                return Relationship.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    }, emr.handleNotLoggedIn);
            },

            createRelationship: function(obj) {
                var created = new Relationship(obj);
                created.$save();
                return created;
            },

            deleteRelationship: function(obj) {
                var toDelete = new Relationship({ uuid: obj.uuid });
                toDelete.$delete();
            }
        }
    });