angular.module('providerAttributeTypeService', ['ngResource', 'uicommons.common'])
    .factory('ProviderAttributeType', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/providerattributetype/:uuid", {
            uuid: '@uuid'
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    });