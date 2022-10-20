describe('EncounterService tests', function() {

    var encounterService;
    var q;
    var deferred;

    beforeEach(module('encounterService'));

    // create mock Encounter resource
    var mockEncounter = jasmine.createSpyObj('Encounter', ['query']);
    mockEncounter.query.and.callFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('Encounter', mockEncounter);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_EncounterService_,$q) {
        encounterService = _EncounterService_;
        q = $q;
    }));

    it('should call Encounter resource with query value', function() {
        encounterService.getEncounters({ 'q': 'abc' });
        expect(mockEncounter.query).toHaveBeenCalledWith({ 'q': 'abc' });
    });

});
