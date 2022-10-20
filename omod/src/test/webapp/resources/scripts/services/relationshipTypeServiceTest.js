describe('RelationshipTypeService tests', function() {

    var relationshipTypeService;
    var q;
    var deferred;

    beforeEach(module('relationshipTypeService'));

    // create mock RelationshipType resource
    var mockRelationshipType = jasmine.createSpyObj('RelationshipType', ['query']);
    mockRelationshipType.query.and.callFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('RelationshipType', mockRelationshipType);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_RelationshipTypeService_,$q) {
        relationshipTypeService = _RelationshipTypeService_;
        q = $q;
    }));

    it('should call RelationshipType resource with query value', function() {
        relationshipTypeService.getRelationshipTypes({ 'q': 'abc' });
        expect(mockRelationshipType.query).toHaveBeenCalledWith({ 'q': 'abc' });
    });

});
