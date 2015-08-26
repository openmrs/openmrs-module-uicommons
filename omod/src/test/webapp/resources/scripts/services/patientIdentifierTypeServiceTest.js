describe('PatientIdentifierTypeService tests', function() {

    var patientIdentifierTypeService;
    var q;
    var deferred;

    beforeEach(module('patientIdentifierTypeService'));

    // create mock PatientIdentifierType resource
    var mockPatientIdentifierType = jasmine.createSpyObj('PatientIdentifierType', ['query']);
    mockPatientIdentifierType.query.andCallFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('PatientIdentifierType', mockPatientIdentifierType);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_PatientIdentifierTypeService_,$q) {
    	patientIdentifierTypeService = _PatientIdentifierTypeService_;
        q = $q;
    }));
});