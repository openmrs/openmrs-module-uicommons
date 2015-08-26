describe('EncounterRoleService tests', function() {

    var encounterRoleService;
    var q;
    var deferred;

    beforeEach(module('encounterRoleService'));

    // create mock EncounterRole resource
    var mockEncounterRole = jasmine.createSpyObj('EncounterRole', ['query']);
    mockEncounterRole.query.andCallFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('EncounterRole', mockEncounterRole);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_EncounterRoleService_,$q) {
        encounterRoleService = _EncounterRoleService_;
        q = $q;
    }));
});