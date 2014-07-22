angular.module('uicommons.filters', []);

angular.module('uicommons.widgets', [ 'personService', 'ui.bootstrap' ]);

angular.module('uicommons', [ 'uicommons.filters', 'uicommons.widgets' ]);