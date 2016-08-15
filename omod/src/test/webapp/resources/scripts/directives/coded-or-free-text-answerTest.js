var OPENMRS_CONTEXT_PATH = "/openmrs";

describe('coded-or-free-text-answer directive tests', function() {

    var $compile;
    var $rootScope;

    beforeEach(module('uicommons.widget.coded-or-free-text-answer'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile('<coded-or-free-text-answer id="my-id" ng-model="testing"/>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain('<input type="text" id="my-id-input" ng-model="ngModel"');
        expect(element.html()).toContain('typeahead="result as format(result) for result in search($viewValue)"');
        expect(element.html()).toContain('typeahead-editable="false"');
    });

});