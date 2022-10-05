describe('ProviderService tests', function() {

    var providerService;
    var q;
    var deferred;

    beforeEach(module('providerService'));

    // create mock Provider resource
    var mockProvider = jasmine.createSpyObj('Provider', ['query']);
    mockProvider.query.and.callFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('Provider', mockProvider);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_ProviderService_,$q) {
        providerService = _ProviderService_;
        q = $q;
    }));

    it('should call Provider resource with query value', function() {
        providerService.getProviders({ 'q': 'abc' })
        expect(mockProvider.query).toHaveBeenCalledWith({ 'q': 'abc' });
    });


});
