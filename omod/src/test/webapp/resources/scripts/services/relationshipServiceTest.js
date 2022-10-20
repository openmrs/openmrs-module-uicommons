describe('RelationshipService tests', function() {

    var relationshipService;
    var q;
    var deferred;

    beforeEach(module('relationshipService'));

    // create mock Relationship resource
    var mockRelationship = jasmine.createSpyObj('Relationship', ['query']);
    mockRelationship.query.and.callFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('Relationship', mockRelationship);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_RelationshipService_,$q) {
        relationshipService = _RelationshipService_;
        q = $q;
    }));

    it('should call Relationship resource with query value', function() {
        relationshipService.getRelationships({ 'q': 'abc' });
        expect(mockRelationship.query).toHaveBeenCalledWith({ 'q': 'abc' });
    });

});
