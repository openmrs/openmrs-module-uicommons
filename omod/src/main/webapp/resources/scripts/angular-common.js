angular.module('uicommons.common', [ '$httpProvider' ]).

    config(function($httpProvider) {
        var interceptor = ['$rootScope', '$q', function ($rootScope, $q) {
            function success(response) {
                return response;
            }

            function error(response) {
                if (response.status === 401 || response.status === 403) {
                    $rootScope.$broadcast('event:auth-loginRequired');
                }
                return $q.reject(response);
            }

            return function (promise) {
                return promise.then(success, error);
            }
        }];
        $httpProvider.responseInterceptors.push(interceptor);

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