describe('PersonService tests', function() {

    var personService;
    var q;
    var deferred;

    beforeEach(module('personService'));

    // create mock Person resource
    var mockPerson = jasmine.createSpyObj('Person', ['query']);
    mockPerson.query.and.callFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('Person', mockPerson);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_PersonService_,$q) {
        personService = _PersonService_;
        q = $q;
    }));

    it('should call Person resource with query value', function() {
        personService.getPersons({ 'q': 'abc' })
        expect(mockPerson.query).toHaveBeenCalledWith({ 'q': 'abc' });
    });


});
