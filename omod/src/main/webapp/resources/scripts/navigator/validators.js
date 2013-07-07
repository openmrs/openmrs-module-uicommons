/*
 * Base prototype for validators
 */
function FieldValidator() {};
FieldValidator.prototype = {
    constructor: FieldValidator,
    validate: function(field) {
        var value = field.value();
        //For radios, check if there is a checked radio in the group in the fieldset
        if ($(field.element).attr('type') == 'radio'){
            var fieldName = field.element.attr('name');
            var groupRadios = field.element.parent().parent().find("input:radio[name="+fieldName+"]");
            _.each(groupRadios, function(groupRadio){
                //ignore the radio that this validator was triggered for
                if($(groupRadio).val() != field.element.val()){
                    if($(groupRadio).is(':checked')){
                        value = field.element.val();
                    }
                }
            });
        }
        if(!this.isValid(value)) {
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
    this.futureDateMessageIdentifier = "dateInFuture";

}
DateFieldValidator.prototype = new FieldValidator();
DateFieldValidator.prototype.constructor = DateFieldValidator;
DateFieldValidator.prototype.validate = function(field){

    if(field.value() && $.trim(field.value()).length > 0) {
        var fieldValue = $.trim(field.value());
        var hasTime = $(field.element).hasClass('use-time');
        var dateRegex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
        if (hasTime)
            dateRegex = /^(\d{1,2})-(\d{1,2})-(\d{4})\s(\d{1,2}):(\d{1,2})$/;

        var regexResult = dateRegex.exec(fieldValue);
        if(!regexResult)
            return emrMessages[this.messageIdentifier];

        var day=regexResult[1], month=regexResult[2], year=regexResult[3];
        if(day < 1 || day > 31 || month < 1 || month > 12)
            return emrMessages[this.messageIdentifier];

        if($(field.element).hasClass('no-future-date')){
            var dateObject;
            if(hasTime)
                dateObject = new Date(year, month-1, day, regexResult[4], regexResult[5]);
            else
                dateObject = new Date(year, month-1, day);

            if(dateObject > new Date())
                return emrMessages[this.futureDateMessageIdentifier];
        }
    }
    return null;
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