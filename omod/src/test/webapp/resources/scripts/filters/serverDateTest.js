describe('serverDate filter tests', function() {

    var $filter;
    var serverDateFilter;

    beforeEach(module('uicommons.filters'));

    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
        serverDateFilter = $filter('serverDate');
    }));

    beforeEach(function() {
        window.openmrs = {
            server: {
                timezoneOffset: 300 // UTC-5
            }
        }
    });

    it('should always format incoming server time the same', function() {
        expect(serverDateFilter("2005-09-22T00:00:00.000-1145")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000-1100")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000-1000")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000-0900")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000-0800")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000-0700")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000-0600")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000-0500")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000-0400")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000-0300")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000-0200")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000-0100")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000-0000")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+0000")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000Z")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+0030")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+0100")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+0200")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+0300")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+0400")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+0500")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+0600")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+0700")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+0800")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+0900")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+1000")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+1100")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000+1130")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00.000")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22T00:00:00")).toBe("22-Sep-2005 0:00");
        expect(serverDateFilter("2005-09-22")).toBe("22-Sep-2005 0:00");
    });

    it('should apply given format', function() {
        expect(serverDateFilter("2005-09-22T00:00:00.000-1145", "H:mm")).toBe("0:00");
    });

});