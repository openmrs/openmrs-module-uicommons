describe('UserService tests', function() {

    var userService;
    var q;
    var deferred;

    beforeEach(module('userService'));

    // create mock User resource
    var mockUser = jasmine.createSpyObj('User', ['query']);
    mockUser.query.andCallFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('User', mockUser);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_UserService_,$q) {
        userService = _UserService_;
        q = $q;
    }));

});