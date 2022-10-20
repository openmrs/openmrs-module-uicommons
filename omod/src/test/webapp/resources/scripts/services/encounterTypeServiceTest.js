describe('EncounterTypeService tests', function() {

    var encounterTypeService;
    var q;
    var deferred;

    beforeEach(module('encounterTypeService'));

    // create mock EncounterType resource
    var mockEncounterType = jasmine.createSpyObj('EncounterType', ['query']);
    mockEncounterType.query.and.callFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('EncounterType', mockEncounterType);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_EncounterTypeService_,$q) {
        encounterTypeService = _EncounterTypeService_;
        q = $q;
    }));

    it('should call EncounterType resource with query value', function() {
        encounterTypeService.getEncounterTypes({ 'q': 'abc' });
        expect(mockEncounterType.query).toHaveBeenCalledWith({ 'q': 'abc' });
    });

});
