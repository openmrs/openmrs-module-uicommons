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
    
    factory("RestService", function($q) {
    	return {
    		getAllResults: function getAllResults(resource, params, deferred, results) {
    			if (!deferred) {
    				deferred = $q.defer();
    			}
    			
    			resource.query(params).$promise.then(function(res) {
    				if (results) {
    					results = results.concat(res.results);
    				} else {
    					results = res.results;
    				}
    				
    				fetchedAll = true;
    				
    				if (res.links) {
    					for (i = 0; i < res.links.length; i++) {
    						if (res.links[i].rel == "next") {
    							var startIndexRe = /startIndex=([0-9]*)/;
    							var startIndex = startIndexRe.exec(res.links[i].uri);
    							
    							params["startIndex"] = startIndex[1];
    							fetchedAll = false;
    							getAllResults(resource, params, deferred, results);
    							break;
    						}
    					}
    				}
    				
    				if (fetchedAll) {
    					deferred.resolve(results);
    				}
    			});
    			
    			return deferred.promise;
    		}
    	}
    }).

    config(function($httpProvider) {
        $httpProvider.interceptors.push('http-auth-interceptor');

        // to prevent the browser from displaying a password pop-up in case of an authentication error
        $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = 'true';
        
        // prevent IE from caching GET request
        $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
        $httpProvider.defaults.headers.common.Pragma = "no-cache";
        $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";
    }).

    run(['$rootScope', '$window', function ($rootScope, $window) {
        $rootScope.$on('event:auth-loginRequired', function () {
            if (confirm(emr.message("uicommons.notLoggedIn", "The operation cannot be completed, because you are no longer logged in. Do you want to go to login page?"))) {
                window.location = "/" + OPENMRS_CONTEXT_PATH + "/login.htm";
            }
        });
    }]);