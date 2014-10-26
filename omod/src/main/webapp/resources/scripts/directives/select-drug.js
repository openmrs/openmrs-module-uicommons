angular.module('uicommons.widget.select-drug', [ 'drugService', 'ui.bootstrap' ])

    .directive('selectDrug', [ 'DrugService', function(DrugService) {

        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                id: '@',
                placeholder: '@'
            },
            link: function($scope, element, attrs) {
                $scope.required = attrs.hasOwnProperty('required'); // required attribute has no value
                $scope.inputId = emr.domId($scope.id, 'sel-drug', 'input');

                $scope.search = function(term) {
                    return DrugService.getDrugs({ q: term });
                }

                $scope.verify = function() {
                    if(!$scope.ngModel) {
                        $('#'+$scope.inputId).val('');
                    }
                }
            },
            template: '<input type="text" id="{{ inputId }}" ng-model="ngModel" ng-blur="verify()" ' +
                'typeahead="drug as drug.display for drug in search($viewValue) | filter:$viewValue" ' +
                'typeahead-editable="false" autocomplete="off" placeholder="{{ placeholder }}" autocomplete="off" ' +
                'ng-required="required" ' +
                'typeahead-wait-ms="20" typeahead-min-length="3" />'
        };
    }]);