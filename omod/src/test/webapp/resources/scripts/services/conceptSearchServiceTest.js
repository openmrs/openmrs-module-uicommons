describe('ConceptSearchService tests', function() {

    var conceptSearchService;
    var q;
    var deferred;

    beforeEach(module('conceptSearchService'));

    // create mock ConceptSearch resource
    var mock = jasmine.createSpyObj('ConceptSearch', ['query']);
    mock.query.and.callFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('ConceptSearch', mock);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_ConceptSearchService_,$q) {
        conceptSearchService = _ConceptSearchService_;
        q = $q;
    }));

    it('should call ConceptSearch resource with query value', function() {
        conceptSearchService.search("abc", { v: "full" });
        expect(mock.query).toHaveBeenCalledWith({ q: 'abc', v: "full" });
    });

});
