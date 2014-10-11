angular.module('uicommons.widget.coded-or-free-text-answer', [ 'conceptSearchService', 'ui.bootstrap' ])

    .directive('codedOrFreeTextAnswer', ['ConceptSearchService', function(ConceptSearchService) {

        function isExactMatch(candidate, query) {
            query = emr.stripAccents(query.toLowerCase());
            return candidate.conceptName && emr.stripAccents(candidate.conceptName.name.toLowerCase()) === query;
        }

        return {
            restrict: 'E',
            scope: {
                ngModel: '=', // the field whose value you want to set to the selected person
                id: '@',
                conceptClass: '@'
            },
            controller: function($scope) {
                $scope.inputId = ($scope.id ? $scope.id : 'coded-or-free-text-answer-' + Math.floor(Math.random() * 10000)) + '-input';

                $scope.search = function(term) {
                    // if it starts/ends with " (e.g. the user chose a free-text value) we trim those before searching
                    if (term.slice(0, 1) === '"') {
                        term = term.slice(1);
                    }
                    if (term.slice(term.length - 1, 1) != '"') {
                        term = term.slice(0, term.length - 1);
                    }
                    var extraParams = { v: "full" };
                    if ($scope.conceptClass) {
                        extraParams.conceptClasses = $scope.conceptClass;
                    }
                    var promise = ConceptSearchService.search(term, extraParams).then(function(results) {
                        var list = [];
                        var exactMatch = false;
                        angular.forEach(results, function(item) {
                            console.log(item);
                            list.push(item);
                            if (!exactMatch && isExactMatch(item, term)) {
                                exactMatch = true;
                            }
                        });
                        if (!exactMatch) {
                            list.push({
                                concept: null,
                                conceptName: null,
                                word: '"' + term + '"',
                                transientWeight: Number.MAX_VALUE
                            });
                        }
                        return list;
                    });
                    return promise;
                };

                $scope.format = function(result) {
                    if (!result) {
                        return "";
                    }
                    if (result.conceptName) {
                        if (result.conceptName.localePreferred) {
                            return result.conceptName.display;
                        } else {
                            return result.conceptName.display + " (" + emr.message("coreapps.consult.synonymFor", "...") + " " + result.concept.display + ")";
                        }
                    }
                    else if (result.concept) {
                        return concept.display;
                    }
                    else {
                        return result.word;
                    }
                }
            },
            template: '<input type="text" id="{{ inputId }}" ng-model="ngModel" ' +
                'typeahead="result as format(result) for result in search($viewValue) | filter:$viewValue" ' +
                'typeahead-editable="false" autofocus />'
        };
    }]);