describe('RSET Utils test', function() {

    var RESTErrorResponse;

    beforeEach(module('uicommons.RESTUtils'));

    beforeEach(inject(function(_RESTErrorResponse_) {
        RESTErrorResponse = _RESTErrorResponse_;
    }))

    it("should translate simple REST error response into display text", function() {

        var response = {
            data: {
                error: {
                    message: "User not logged in",
                    globalErrors: [],
                    fieldErrors: {}
                }
            }
        }

        var messages = new RESTErrorResponse(response).getDisplayMessages();

        expect(messages.length).toBe(1);
        expect(messages[0]).toBe("User not logged in");
    })


    it("should translate validation REST error response into display text", function() {

        var response = {
            data: {
                error: {
                    message: "Invalid submission",
                    globalErrors: [
                        { message: "First global error" },
                        { message: "Second global error" }
                    ],
                    fieldErrors: {
                        birthdate: [
                            { message: "First birthdate error" },
                            { message: "Second birthdate error" }
                        ],
                        identifier: [
                            { message: "Identifier error"}
                        ]
                    }
                }
            }
        }

        var messages = new RESTErrorResponse(response).getDisplayMessages();

        expect(messages.length).toBe(5);
        expect(messages[0]).toBe("First global error");
        expect(messages[1]).toBe("Second global error");
        expect(messages[2]).toBe("First birthdate error");
        expect(messages[3]).toBe("Second birthdate error");
        expect(messages[4]).toBe("Identifier error");

    });

    it("should return status code from REST response", function() {

        var response = {
            status: "400"
        }

        expect((new RESTErrorResponse(response)).getStatus()).toBe("400");
    })

});