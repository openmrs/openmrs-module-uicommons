describe("Test for form validators", function() {
    emrMessages = {
        requiredField: 'requiredFieldMessage',
        dateField: 'dateFieldMessage',
        integerField: 'integerFieldMessage',
        numberField: 'numberFieldMessage',
        numericRangeLow: 'numericRangeLow {0}',
        numericRangeHigh: 'numericRangeHigh {0}'
    };
    var validator, field;

    describe("Integer fields", function() {
        beforeEach(function() {
            validator = new IntegerFieldValidator();
            field = jasmine.createSpyObj("field", ['value']);
        });
        it("should allow an empty string", function() {
            field.value.andReturn("");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should not allow whitespaces", function() {
            field.value.andReturn(" ");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('integerFieldMessage');
        });
        it("should validate an integer", function() {
            field.value.andReturn("7");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should not validate a float", function() {
            field.value.andReturn("7.5");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('integerFieldMessage');
        });
        it("should not validate text", function() {
            field.value.andReturn("something");

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
            field.value.andReturn("7");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should validate a float", function() {
            field.value.andReturn("-7.5");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should not validate text", function() {
            field.value.andReturn("something");

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
            field.value.andReturn("something");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe(null);
        });
        it("should not validate empty field", function() {
            field.value.andReturn("");

            var validationMessage = validator.validate(field);
            expect(validationMessage).toBe('requiredFieldMessage');
        });

        describe("Date fields", function() {
            beforeEach(function() {
                validator = new DateFieldValidator();
                field = jasmine.createSpyObj("field", ['value']);
            });

            it("should validate correct date", function() {
                field.value.andReturn("30-10-2010");

                var validationMessage = validator.validate(field);
                expect(validationMessage).toBe(null);
            });
            it("should not validate incorrect date", function() {
                field.value.andReturn("32-13-2010");

                var validationMessage = validator.validate(field);
                expect(validationMessage).toBe('dateFieldMessage');
            });
            it("should not validate a non date", function() {
                field.value.andReturn("nondate");

                var validationMessage = validator.validate(field);
                expect(validationMessage).toBe('dateFieldMessage');
            });
        })
    });
})