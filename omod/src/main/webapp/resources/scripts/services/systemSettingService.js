angular.module('systemSettingService', ['ngResource', 'uicommons.common'])
    .factory('SystemSetting', function($resource) {
        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/systemsetting/:uuid", {
            uuid: '@uuid'
        },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
        });
    });