angular.module('uicommons.widgets')

    .directive('selectPerson', ['PersonService', function(PersonService) {

        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                id: '@',
                excludePerson: '@',
                focusAfterSelect: '@'
            },
            controller: function($scope) {
                $scope.search = function(term) {
                    var promise = PersonService.getPersons({ q: term });
                    if ($scope.excludePerson) {
                        // e.g. if a patient page wants to let you search for any _other_ person
                        return promise.then(function(result) {
                            return _.reject(result, function(item) {
                                return item.uuid == $scope.excludePerson;
                            });
                        });
                    } else {
                        return promise;
                    }
                }
            },
            template: '<input type="text" id="{{ id }}-input" ng-model="ngModel" ' +
                'typeahead="person as person.display for person in search($viewValue) | filter:$viewValue" ' +
                'typeahead-editable="false" autofocus />'
        };
    }]);