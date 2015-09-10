angular.module('uicommons.common', []).

    factory('http-auth-interceptor', function($q, $rootScope) {
        return {
            responseError: function(response) {
                if (response.status === 401 || response.status === 403) {
                    $rootScope.$broadcast('event:auth-loginRequired');
                }
                return $q.reject(response);
            }
        }
    }).

    config(function($httpProvider) {
        $httpProvider.interceptors.push('http-auth-interceptor');

        // to prevent the browser from displaying a password pop-up in case of an authentication error
        $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = 'true';
    }).

    run(['$rootScope', '$window', function ($rootScope, $window) {
        $rootScope.$on('event:auth-loginRequired', function () {
            if (confirm(emr.message("uicommons.notLoggedIn", "The operation cannot be completed, because you are no longer logged in. Do you want to go to login page?"))) {
                window.location = "/" + OPENMRS_CONTEXT_PATH + "/login.htm";
            }
        });
    }]);