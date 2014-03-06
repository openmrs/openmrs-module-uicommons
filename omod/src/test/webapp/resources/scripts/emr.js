
var window;
window.messages = {};

describe("Tests of emr functions", function() {

    it("should display success message", function() {

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').andCallThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.successMessage("some success message");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'success', position : 'top-right', text : 'some success message' });

    });

    it("should display error message", function() {

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').andCallThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.errorMessage("some error message");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'error', position : 'top-right', text : 'some error message' });

    });

    it("should display success alert", function() {

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').andCallThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.successAlert("some success message");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'success', position : 'top-right', text : 'some success message', stayTime: 8000, close: null });

    });

    it("should display error alert", function() {

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').andCallThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.errorAlert("some error message");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'error', position : 'top-right', text : 'some error message', stayTime: 8000, close: null });

    });

    it("should translate success message", function() {

        window.messages['success.message.code'] = 'some success message';

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').andCallThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.successMessage("success.message.code");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'success', position : 'top-right', text : 'some success message' });

    });

    it("should translate error message", function() {

        window.messages['error.message.code'] = 'some error message';

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').andCallThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.errorMessage("error.message.code");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'error', position : 'top-right', text : 'some error message' });

    });

    it("should translate alert message", function() {

        window.messages['alert.message.code'] = 'some alert message';

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').andCallThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.alertMessage("alert.message.code");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'alert', position : 'top-right', text : 'some alert message' });

    });


    it("should translate success alert", function() {

        window.messages['success.message.code'] = 'some success message';

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').andCallThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.successAlert("success.message.code");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'success', position : 'top-right', text : 'some success message', stayTime: 8000, close: null });

    });

    it("should translate error alert", function() {

        window.messages['error.message.code'] = 'some error message';

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').andCallThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.errorAlert("error.message.code");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'error', position : 'top-right', text : 'some error message', stayTime: 8000, close: null });

    });

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

        var messages = emr.formatRESTErrorResponseIntoDisplayMessages(response);

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

        var messages = emr.formatRESTErrorResponseIntoDisplayMessages(response);

        expect(messages.length).toBe(5);
        expect(messages[0]).toBe("First global error");
        expect(messages[1]).toBe("Second global error");
        expect(messages[2]).toBe("First birthdate error");
        expect(messages[3]).toBe("Second birthdate error");
        expect(messages[4]).toBe("Identifier error");

    });
})