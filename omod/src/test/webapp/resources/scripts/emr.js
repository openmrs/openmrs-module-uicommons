
var window;
window.messages = {};

describe("Tests of emr functions", function() {

    it("should display success message", function() {

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').and.callThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.successMessage("some success message");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'success', position : 'top-right', text : 'some success message' });

    });

    it("should display error message", function() {

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').and.callThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.errorMessage("some error message");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'error', position : 'top-right', sticky: true, text : 'some error message' });

    });

    it("should display success alert", function() {

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').and.callThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.successAlert("some success message");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'success', position : 'top-right', text : 'some success message', stayTime: 8000, close: null });

    });

    it("should display error alert", function() {

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').and.callThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.errorAlert("some error message");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'error', position : 'top-right', text : 'some error message', stayTime: 8000, close: null });

    });

    it("should translate success message", function() {

        window.messages['success.message.code'] = 'some success message';

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').and.callThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.successMessage("success.message.code");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'success', position : 'top-right', text : 'some success message' });

    });

    it("should translate error message", function() {

        window.messages['error.message.code'] = 'some error message';

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').and.callThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.errorMessage("error.message.code");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'error', position : 'top-right', sticky: true, text : 'some error message' });

    });

    it("should translate alert message", function() {

        window.messages['alert.message.code'] = 'some alert message';

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').and.callThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.alertMessage("alert.message.code");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'alert', position : 'top-right', text : 'some alert message' });

    });


    it("should translate success alert", function() {

        window.messages['success.message.code'] = 'some success message';

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').and.callThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.successAlert("success.message.code");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'success', position : 'top-right', text : 'some success message', stayTime: 8000, close: null });

    });

    it("should translate error alert", function() {

        window.messages['error.message.code'] = 'some error message';

        var jqueryWithSpy = jq();
        emr.setJqObject(jqueryWithSpy);

        spyOn(jqueryWithSpy,'toastmessage').and.callThrough();  // call through just to make sure the underlying plugin doesn't throw an error

        emr.errorAlert("error.message.code");

        expect(jqueryWithSpy.toastmessage).toHaveBeenCalledWith('showToast', { type : 'error', position : 'top-right', text : 'some error message', stayTime: 8000, close: null });

    });

    it("should say a more precise session locale is compatible", function() {
        window.sessionContext = { locale: 'en_GB' };
        expect(emr.isCompatibleWithSessionLocale('en')).toBe(true);
    });

    it("should say a less precise session locale is compatible", function() {
        window.sessionContext = { locale: 'en' };
        expect(emr.isCompatibleWithSessionLocale('en_GB')).toBe(true);
    });

    it("should say a different session locale is compatible", function() {
        window.sessionContext = { locale: 'en_US' };
        expect(emr.isCompatibleWithSessionLocale('en_GB')).toBe(false);
    });

    it("should say a completely different session locale is not compatible", function() {
        window.sessionContext = { locale: 'en_GB' };
        expect(emr.isCompatibleWithSessionLocale('fr')).toBe(false);
    });
})
