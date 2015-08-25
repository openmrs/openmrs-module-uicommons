angular.module('roleService', ['ngResource'])
	.config(function ($httpProvider) {
	    // to prevent the browser from displaying a password pop-up in case of an authentication error
	    $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = 'true';

	    // IE GET cache problem
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.common = {};
        }
        $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
        $httpProvider.defaults.headers.common.Pragma = "no-cache";
        $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";
	})
    .factory('Role', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/role/:uuid", {
            uuid: '@uuid'
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    })
    .factory('RoleService', function(Role) {

        return {

            /**
             * Fetches Roles
             *
             * @param params to search against
             * @returns $promise of array of matching Roles (REST ref representation by default)
             */
            getRoles: function(params) {
                return Role.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    }, emr.handleNotLoggedIn);
            },

            deleteRole: function(role) {
                var uuid = typeof role === "string" ? role : role.uuid;
                return new Role({ uuid: uuid }).$delete();
            },
        
            // if role has uuid property this will update, else it will create new
            saveRole: function(role) {
                return new Role(role).$save();
            }
        }
    });