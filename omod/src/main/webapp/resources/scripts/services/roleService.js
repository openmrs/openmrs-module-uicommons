angular.module('roleService', ['ngResource', 'uicommons.common'])
	.config(function ($httpProvider) {
	})
    .factory('Role', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/role/:uuid", {
            uuid: '@uuid'
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    });