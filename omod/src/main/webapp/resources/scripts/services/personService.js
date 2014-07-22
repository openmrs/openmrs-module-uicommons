angular.module('personService', ['ngResource'])
    .config(function ($httpProvider) {
        // to prevent the browser from displaying a password pop-up in case of an authentication error
        $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = 'true';
    })
    .factory('Person', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/person/:uuid", {
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    })
    .factory('PersonService', function(Person) {

        return {

            /**
             * Fetches Persons
             *
             * @param params to search against
             * @returns $promise of array of matching Persons (REST ref representation by default)
             */
            getPersons: function(params) {
                return Person.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    }, emr.handleNotLoggedIn);
            }
        }
    });