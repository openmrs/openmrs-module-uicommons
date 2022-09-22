describe('LocationService tests', function() {

    var locationService;
    var q;
    var deferred;

    beforeEach(module('locationService'));

    // create mock Location resource
    var mockLocation = jasmine.createSpyObj('Location', ['query']);
    mockLocation.query.and.callFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('Location', mockLocation);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_LocationService_,$q) {
        locationService = _LocationService_;
        q = $q;
    }));

    it('should call Location resource with query value', function() {
        locationService.getLocations({ 'q': 'abc' });
        expect(mockLocation.query).toHaveBeenCalledWith({ 'q': 'abc' });
    });


});
