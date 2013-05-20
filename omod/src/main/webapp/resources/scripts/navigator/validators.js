/*
 * Base prototype for validators
 */
function FieldValidator() {};
FieldValidator.prototype = {
    constructor: FieldValidator,
    validate: function(field) {
        if(!this.isValid(field.value())) {
            return emrMessages[this.messageIdentifier];
        }
        return null;
    }
}

function RequiredFieldValidator() {
    this.messageIdentifier = "requiredField";
}
RequiredFieldValidator.prototype = new FieldValidator();
RequiredFieldValidator.prototype.constructor = RequiredFieldValidator;
RequiredFieldValidator.prototype.isValid = function(fieldValue) {
    return fieldValue != null && fieldValue.length > 0;
}


function DateFieldValidator() {
    this.messageIdentifier = "dateField";
}
DateFieldValidator.prototype = new FieldValidator();
DateFieldValidator.prototype.constructor = DateFieldValidator;
DateFieldValidator.prototype.isValid = function(fieldValue) {
    if(fieldValue && fieldValue.length > 0) {
        var dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        var regexResult = dateRegex.exec(fieldValue);
        if(!regexResult) {
            return false;
        }
        var day=regexResult[1], month=regexResult[2], year=regexResult[3];
        if(day < 1 || day > 31 || month < 1 || month > 12) return false;
    }
    return true;
}


function IntegerFieldValidator() {
    this.messageIdentifier = "integerField";
}
IntegerFieldValidator.prototype = new FieldValidator();
IntegerFieldValidator.prototype.constructor = IntegerFieldValidator;
IntegerFieldValidator.prototype.isValid = function(fieldValue) {
    var integerRegex = /^-?\d+$/;
    if (fieldValue && fieldValue.length > 0) {
        return integerRegex.test(fieldValue);
    }
    return true;
}


function NumberFieldValidator() {
    this.messageIdentifier = "numberField";
}
NumberFieldValidator.prototype = new FieldValidator();
NumberFieldValidator.prototype.constructor = NumberFieldValidator;
NumberFieldValidator.prototype.isValid = function(fieldValue) {
    var numberRegex = /^-?((\d+(\.\d+)?)|(\.\d+))$/;
    if (fieldValue && fieldValue.length > 0) {
        return numberRegex.test(fieldValue);
    }
    return true;
}


function NumericRangeFieldValidator() {
    this.lowMessageIdentifier = "numericRangeLow";
    this.highMessageIdentifier = "numericRangeHigh";
}
NumericRangeFieldValidator.prototype = new FieldValidator();
NumericRangeFieldValidator.prototype.constructor = NumericRangeFieldValidator;
NumericRangeFieldValidator.prototype.validate = function(field) {
    var asNumber = parseFloat(field.value());
    if (asNumber != null && !isNaN(asNumber)) {
        var rangeMin = parseFloat(field.element.attr("min"));
        if (rangeMin != null && !isNaN(rangeMin)) {
            if (asNumber < rangeMin) {
                return emrMessages[this.lowMessageIdentifier].replace("{0}", rangeMin);
            }
        }
        var rangeMax = parseFloat(field.element.attr("max"));
        if (rangeMax != null && !isNaN(rangeMax)) {
            if (asNumber > rangeMax) {
                return emrMessages[this.highMessageIdentifier].replace("{0}", rangeMax);
            }
        }
    }
    return null;
}

var Validators = {
    required: new RequiredFieldValidator(),
    date: new DateFieldValidator(),
    integer: new IntegerFieldValidator(),
    number: new NumberFieldValidator(),
    "numeric-range": new NumericRangeFieldValidator()
}