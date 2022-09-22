describe("Test for form validators", function() {
    emrMessages = {
        requiredField: 'requiredFieldMessage',
        dateField: 'dateFieldMessage',
        integerField: 'integerFieldMessage',
        numberField: 'numberFieldMessage',
        numericRangeLow: 'numericRangeLow {0}',
        numericRangeHigh: 'numericRangeHigh {0}',
        selectedMonthHas30Days: 'selectedMonthHas30DaysMessage',
        februaryDaysOutOfRange: 'februaryDaysOutOfRangeMessage',
        dateInFuture: 'dateInFutureMessage',
        requiredDateOrEstimatedDateField: 'requiredDateOrEstimatedDateFieldMessage'
    };
    var validator, field;

    describe("Integer fields", function() {
        beforeEach(function() {
            validator = new IntegerFieldValidator();
            field = jasmine.createSpyObj("field", ['value']);
        });
        it("should allow an empty string", function() {
            field.value.and.returnValue("");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should not allow whitespaces", function() {
            field.value.and.returnValue(" ");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('integerFieldMessage');
        });
        it("should validate an integer", function() {
            field.value.and.returnValue("7");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should not validate a float", function() {
            field.value.and.returnValue("7.5");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('integerFieldMessage');
        });
        it("should not validate text", function() {
            field.value.and.returnValue("something");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('integerFieldMessage');
        });
    });

    describe("Number fields", function() {
        beforeEach(function() {
            validator = new NumberFieldValidator();
            field = jasmine.createSpyObj("field", ['value']);
        });
        it("should validate an integer", function() {
            field.value.and.returnValue("7");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should validate a float", function() {
            field.value.and.returnValue("-7.5");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should not validate text", function() {
            field.value.and.returnValue("something");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('numberFieldMessage');
        });
    });

    describe("Numeric ranges", function() {
        beforeEach(function() {
            validator = new NumericRangeFieldValidator();
            field = {
                value: function() { return "7" }
            }
        });
        it("should validate a number greater than min", function() {
            field.element = $('<input type="text" min="5"/>');

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should not validate a number less than min", function() {
            field.element = $('<input type="text" min="10"/>');

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('numericRangeLow 10');
        });
        it("should validate a number less than max", function() {
            field.element = $('<input type="text" max="10"/>');

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should not validate a number greater than max", function() {
            field.element = $('<input type="text" max="5"/>');

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('numericRangeHigh 5');
        });
        it("should validate a number in range", function() {
            field.element = $('<input type="text" min="5" max="10"/>');

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should not validate a number outside range", function() {
            field.element = $('<input type="text" min="0" max="5"/>');

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('numericRangeHigh 5');
        });
        it("should correctly interpret min=0 to mean a minimum value of 0", function() {

            field = {
                element: $('<input type="text" min="0" max="5"/>'),
                value: function() { return "-1" }
            }

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('numericRangeLow 0');
        });
        it("should correctly interpret max=0 to mean a maximum value of 0", function() {
            field.element = $('<input type="text" min="-1" max="0"/>');

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('numericRangeHigh 0');
        });
    });

    describe("Required fields", function() {
        beforeEach(function() {
            validator = new RequiredFieldValidator();
            field = jasmine.createSpyObj("field", ['value']);
        });

        it("should validate non empty field", function() {
            field.value.and.returnValue("something");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should not validate empty field", function() {
            field.value.and.returnValue("");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('requiredFieldMessage');
        });

        describe("Date fields", function() {
            beforeEach(function() {
                validator = new DateFieldValidator();
                field = jasmine.createSpyObj("field", ['value']);
            });

            it("should validate correct date", function() {
                field.value.and.returnValue("30-10-2010");

                var validationMessage = validator.validate(field);
                expect(validationMessage).toBe(null);
            });
            it("should not validate incorrect date", function() {
                field.value.and.returnValue("32-13-2010");

                var validationMessage = validator.validate(field);
                expect(validationMessage).toBe('dateFieldMessage');
            });
            it("should not validate a non date", function() {
                field.value.and.returnValue("nondate");

                var validationMessage = validator.validate(field);
                expect(validationMessage).toBe('dateFieldMessage');
            });
            it("should allow 29th for february for a leap year", function() {
                field.value.and.returnValue("29-02-2012");
                expect(validator.validate(field)).toBe(null);
            });
            it("should allow 31st for a month with 31 days", function() {
                field.value.and.returnValue("31-08-2012");
                expect(validator.validate(field)).toBe(null);
            });
            it("should reject 31 for months with less than 31 days", function() {
                var invalidDate = "31-04-2011";
                field.value.and.returnValue(invalidDate);
                var expectedErrorMessage = 'selectedMonthHas30DaysMessage';

                var validationMessage = validator.validate(field);
                expect(validationMessage).toBe(expectedErrorMessage);

                invalidDate = "31-06-2011";
                validationMessage = validator.validate(field);
                expect(validationMessage).toBe(expectedErrorMessage);

                invalidDate = "31-09-2011";
                validationMessage = validator.validate(field);
                expect(validationMessage).toBe(expectedErrorMessage);

                invalidDate = "31-11-2011";
                validationMessage = validator.validate(field);
                expect(validationMessage).toBe(expectedErrorMessage);
            });
            it("should reject dates beyond 28th for february for a non leap year", function() {
                var invalidDate = "29-02-2010";
                field.value.and.returnValue(invalidDate);
                var febErrorMessage = 'februaryDaysOutOfRangeMessage';

                var validationMessage = validator.validate(field);
                expect(validationMessage).toBe(febErrorMessage);

                invalidDate = "30-02-2010";
                validationMessage = validator.validate(field);
                expect(validationMessage).toBe(febErrorMessage);

                invalidDate = "31-02-2010";
                validationMessage = validator.validate(field);
                expect(validationMessage).toBe(febErrorMessage);
            });
            it("should reject future date", function() {
                var invalidDate = "01-01-2100";  // will start to fail in year 2100, for whoever finds this, hello from 2022

                var validationMessage = validator.validateInternal(invalidDate, false, true);
                expect(validationMessage).toBe('dateInFutureMessage');
            });
        })
    });
})
