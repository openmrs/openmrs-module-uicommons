angular.module('privilegeService', ['ngResource'])
    .config(function ($httpProvider) {
        // to prevent the browser from displaying a password pop-up in case of an authentication error
        $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = 'true';
    })
    .factory('Privilege', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/privilege/:uuid", {
            uuid: '@uuid'
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    })
    .factory('PrivilegeService', function(Privilege) {

        return {

            /**
             * Fetches Privilege
             *
             * @param params to search against
             * @returns $promise of array of matching Privileges (REST ref representation by default)
             */
            getPrivileges: function(params) {
                return Privilege.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    }, emr.handleNotLoggedIn);
            },

            // if role has uuid property this will update, else it will create new
            savePrivilege: function(privilege) {
                return new Privilege(privilege).$save();
            },

            retirePrivilege: function(privilege) {
                var uuid = typeof privilege === "string" ? privilege : privilege.uuid;
                return new Privilege({ uuid: uuid }).$delete();
            },

            unretirePrivilege: function(privilege) {
                var uuid = typeof privilege === "string" ? privilege : privilege.uuid;
                return new Privilege({ uuid: uuid, retired: false }).$save();
            }
        }
    });