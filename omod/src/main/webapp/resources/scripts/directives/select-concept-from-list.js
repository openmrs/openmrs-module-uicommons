angular.module('uicommons.widget.select-concept-from-list', [ 'ui.bootstrap' ])

    .directive('selectConceptFromList', [ function() {

        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                id: '@',
                locale: '@',
                placeholder: '@',
                concepts: '&'
            },
            link: function($scope, element, attrs) {
                $scope.required = attrs.hasOwnProperty('required'); // required attribute has no value
                console.log(attrs);
                console.log($scope.required);
                $scope.inputId = emr.domId($scope.id, 'sel-concept', 'input');

                var options = [];
                _.each($scope.concepts(), function(concept) {
                    _.each(concept.names, function(name) {
                        if (emr.isCompatibleWithSessionLocale(name.locale)) {
                            var display = name.name === concept.display ?
                                name.name :
                                name.name + " &rarr; " + concept.display;
                            options.push({
                                display: display,
                                searchOn: name.name,
                                concept: concept
                            });
                        }
                    });
                });
                $scope.options = _.sortBy(options, function(item) {
                    return item.display.length;
                });

                $scope.verify = function() {
                    if(!$scope.ngModel){
                        $('#'+$scope.inputId).val('');
                    }
                }
            },
            template: '<input type="text" id="{{ inputId }}" ng-model="ngModel" ng-blur="verify()" ' +
                'ng-required="required" ' +
                'typeahead="opt.concept as opt.display for opt in options | filter:{searchOn:$viewValue}" ' +
                'typeahead-editable="false" autocomplete="off" placeholder="{{ placeholder }}" />'
        };
    }]);