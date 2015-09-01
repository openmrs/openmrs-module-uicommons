describe('SystemSettingService tests', function() {

    var systemSettingService;
    var q;
    var deferred;

    beforeEach(module('systemSettingService'));

    // create mock SystemSetting resource
    var mockSystemSetting = jasmine.createSpyObj('SystemSetting', ['query']);
    mockSystemSetting.query.andCallFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('SystemSetting', mockSystemSetting);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_SystemSettingService_,$q) {
    	systemSettingService = _SystemSettingService_;
        q = $q;
    }));
});