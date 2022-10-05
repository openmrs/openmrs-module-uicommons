describe('ProviderAttributeTypeService tests', function() {

    var providerAttributeTypeService;
    var q;
    var deferred;

    beforeEach(module('providerAttributeTypeService'));

    // create mock ProviderAttributeType resource
    var mockProviderAttributeType = jasmine.createSpyObj('ProviderAttributeType', ['query']);
    mockProviderAttributeType.query.and.callFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('ProviderAttributeType', mockProviderAttributeType);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_ProviderAttributeTypeService_,$q) {
    	providerAttributeTypeService = _ProviderAttributeTypeService_;
        q = $q;
    }));

    it('should call ProviderAttributeType resource with query value', function() {
        providerAttributeTypeService.getProviderAttributeTypes({ 'q': 'abc' });
        expect(mockProviderAttributeType.query).toHaveBeenCalledWith({ 'q': 'abc' });
    });

});
