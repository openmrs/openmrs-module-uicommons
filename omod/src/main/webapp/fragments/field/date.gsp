<%
    config.require("id", "label", "formFieldName", "monthOptions")

    def dateComponentClass = "date-component";
    def initialDay,initialMonth, initialYear
    def dayClasses = [dateComponentClass, "number", "numeric-range"]
    def monthClasses = [dateComponentClass]
    def yearClasses = [dateComponentClass, "number"]
    def hiddenValidationFieldClasses = []

    if(config.classes){
        dayClasses.addAll(config.classes)
        monthClasses.addAll(config.classes)
        yearClasses.addAll(config.classes)
        hiddenValidationFieldClasses.addAll(config.classes)
        //The hidden field we use for validating the date shouldn't have the required
        //class since it is already included for day,month,year individually inputs
        //otherwise the user will see the error message but the field is invisible
        if(hiddenValidationFieldClasses.contains("required"))
            hiddenValidationFieldClasses.remove("required")
    }


    if(config.initialValue){
        Calendar cal = Calendar.getInstance()
        cal.setTime(config.initialValue)
        initialDay = cal.get(Calendar.DAY_OF_MONTH)
        initialMonth = cal.get(Calendar.MONTH)+1
        initialYear = cal.get(Calendar.YEAR)
    }
%>

<script type="text/javascript">
    var ${config.formFieldName}FieldModel;
    var ${config.formFieldName}Day = ${(initialDay) ? initialDay : "''"};
    var ${config.formFieldName}Month = ${(initialMonth) ? initialMonth : "''"};
    var ${config.formFieldName}Year = ${(initialYear) ? initialYear : "''"};
    var ${config.formFieldName}FieldModel;

    jQuery(document).ready(function(){
        <% if(config.initialValue){ %>
                jQuery('#${config.formFieldName}-validation-value').val('${initialDay}-${initialMonth}-${initialYear}');
                jQuery('#${config.formFieldName}-value').val('${initialYear}-${initialMonth}-${initialDay}');
        <% } %>

        ${config.formFieldName}FieldModel = new FieldModel(jQuery("#${config.formFieldName}-validation-value"), null, jQuery("#${config.formFieldName}-field-error"));

        _.each(jQuery('.${dateComponentClass}'), function(dateElement){
            jQuery(dateElement).blur(function(){
                var elementValue = '';
                if(this.value && jQuery.trim(this.value).length > 0)
                    elementValue = jQuery.trim(this.value)

                if(this.id == '${config.formFieldName}Day-field'){
                    if(elementValue.length > 0)
                        ${config.formFieldName}Day = elementValue;
                    else
                        ${config.formFieldName}Day = '';
                }else if(this.id == '${config.formFieldName}Month-field'){
                    if(elementValue.length > 0)
                        ${config.formFieldName}Month = elementValue;
                    else
                        ${config.formFieldName}Month = '';
                }else if (this.id == '${config.formFieldName}Year-field'){
                    if(elementValue.length > 0)
                        ${config.formFieldName}Year = elementValue;
                    else
                        ${config.formFieldName}Year = '';
                }

                if(${config.formFieldName}Day.length > 0 && ${config.formFieldName}Month.length > 0
                        && ${config.formFieldName}Year.length > 0){

                    jQuery('#${config.formFieldName}-validation-value').val(${config.formFieldName}Day+"-"+${config.formFieldName}Month+"-"+${config.formFieldName}Year);
                    var dateErrorMessage = new DateFieldValidator().validate(${config.formFieldName}FieldModel);
                    var errorsField = ${config.formFieldName}FieldModel.element.parent().find('span.field-error').first();
                    if(dateErrorMessage) {
                        errorsField.html(dateErrorMessage);
                        errorsField.show();
                        return;
                    }

                    errorsField.html('');
                    errorsField.hide();
                    jQuery('#${config.formFieldName}-value').val(${config.formFieldName}Year+"-"+${config.formFieldName}Month+"-"+${config.formFieldName}Day);
                }
            });
        });
    });

</script>

<p id="${config.id}">

    <span id="${config.formFieldName}-date-field-error" class="field-error" style="display:none"></span>

    ${ ui.includeFragment("uicommons", "field/text", [
            label: ui.message("registrationapp.birthdate.day.label"),
            id: config.formFieldName+"Day",
            formFieldName: config.formFieldName+"Day",
            initialValue: initialDay,
            classes: dayClasses,
            min: 1,
            max: 31,
            size: 5,
            maxLength: 2,
            left: true])}
    ${ ui.includeFragment("uicommons", "field/dropDown", [
            label: ui.message("registrationapp.birthdate.month.label"),
            id: config.formFieldName+"Month",
            formFieldName: config.formFieldName+"Month",
            initialValue: initialMonth,
            classes: monthClasses,
            options: config.monthOptions,
            maximumSize: 10,
            left: true])}
    ${ ui.includeFragment("uicommons", "field/text", [
            label: ui.message("registrationapp.birthdate.year.label"),
            id: config.formFieldName+"Year",
            formFieldName: config.formFieldName+"Year",
            initialValue: initialYear,
            classes: yearClasses,
            size: 5,
            maxLength: 4,
            left: true])}

    <%
        //This input is used to display the date in dd-MM-yyyy format since it what the date
        //field validator uses and for displaying error messages after constructing the full date
        //from the day, month year inputs and ensures the user does not leave the date question
        //in the section if the date is invalid
    %>
    <br/>
    <p style="float: left">
        <input id="${config.formFieldName}-validation-value" type="hidden" class="date ${ hiddenValidationFieldClasses.join(' ') }" />
        ${ ui.includeFragment("uicommons", "fieldErrors", [ fieldName: config.formFieldName ]) }
    </p>

    <%
        //This input holds the actual date value in yyyy-MM-dd format that is submitted
        //to the server after constructing the full date from the day, month year inputs
    %>
    <input id="${config.formFieldName}-value" type="hidden" name="${config.formFieldName}" />
</p>
