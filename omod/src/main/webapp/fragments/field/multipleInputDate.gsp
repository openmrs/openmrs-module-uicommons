<%
    config.require("id", "label", "formFieldName")

    def defaultMonthOptions = [ [label: ui.message("uicommons.month.1"), value: 1],
                                [label: ui.message("uicommons.month.2"), value: 2],
                                [label: ui.message("uicommons.month.3"), value: 3],
                                [label: ui.message("uicommons.month.4"), value: 4],
                                [label: ui.message("uicommons.month.5"), value: 5],
                                [label: ui.message("uicommons.month.6"), value: 6],
                                [label: ui.message("uicommons.month.7"), value: 7],
                                [label: ui.message("uicommons.month.8"), value: 8],
                                [label: ui.message("uicommons.month.9"), value: 9],
                                [label: ui.message("uicommons.month.10"), value: 10],
                                [label: ui.message("uicommons.month.11"), value: 11],
                                [label: ui.message("uicommons.month.12"), value: 12] ]

    def dateComponentClass = "date-component";
    def initialDay,initialMonth, initialYear, initialYears, initialMonths
    def minYear, maxYear
    def dayClasses = ["day", "number", "numeric-range", dateComponentClass]
    def monthClasses = ["month", dateComponentClass]
    def yearClasses = ["year", "number", "numeric-range", dateComponentClass]
    def monthsClasses = ["months", "number", "numeric-range", dateComponentClass]
    def yearsClasses = ["years", "number", "numeric-range", dateComponentClass]

    if(config.monthOptions)
        defaultMonthOptions = config.monthOptions;

    if(config.classes){
        dayClasses.addAll(config.classes)
        monthClasses.addAll(config.classes)
        yearClasses.addAll(config.classes)
        yearsClasses.addAll(config.classes)
        monthsClasses.addAll(config.classes)
    }

    if(config.initialValue){
        Calendar cal = Calendar.getInstance()
        cal.setTime(config.initialValue)
        initialDay = cal.get(Calendar.DAY_OF_MONTH)
        initialMonth = cal.get(Calendar.MONTH)+1
        initialYear = cal.get(Calendar.YEAR)
    }
    if(config.minYear) {
        minYear = config.minYear
    } else {
        minYear = ''
    }
    if(config.maxYear) {
        maxYear = config.maxYear
    } else {
        maxYear = ''
    }
%>

<script type="text/javascript">
    var ${config.formFieldName}Day = ${(initialDay) ? initialDay : "''"};
    var ${config.formFieldName}Month = ${(initialMonth) ? initialMonth : "''"};
    var ${config.formFieldName}Year = ${(initialYear) ? initialYear : "''"};

    jQuery(document).ready(function(){
        <% if(config.initialValue){ %>
                jQuery('#${config.formFieldName}-value').val('${initialYear}-${initialMonth}-${initialDay}');
        <% } %>

        _.each(jQuery('.${dateComponentClass}'), function(dateElement){
            jQuery(dateElement).blur(function(){
                var elementValue = '';
                if(this.value && jQuery.trim(this.value).length > 0)
                    elementValue = jQuery.trim(this.value);

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

                if (${config.formFieldName}Year != '' && ${config.formFieldName}Month != '' && ${config.formFieldName}Day != '') {
                    jQuery('#${config.formFieldName}-value').val(${config.formFieldName}Year+"-"+${config.formFieldName}Month+"-"+${config.formFieldName}Day);
                } else {
                    jQuery('#${config.formFieldName}-value').val('');
                    jQuery('#${config.formFieldName}Years-field').prop('disabled', false);
                    jQuery('#${config.formFieldName}Months-field').prop('disabled', false);
                }
            });
        });
    });

</script>

<p id="${config.id}">
    <label for="${ config.id }-field">
        ${ config.label } <% if (config.classes && config.classes.contains("requiredTitle")) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %>
    </label>
    ${ ui.includeFragment("uicommons", "fieldErrors", [ fieldName: config.formFieldName ]) }

    ${ ui.includeFragment("uicommons", "field/text", [
            label: ui.message("uicommons.multipleInputDate.day.label"),
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
            label: ui.message("uicommons.multipleInputDate.month.label"),
            emptyOptionLabel: "uicommons.select",
            id: config.formFieldName+"Month",
            formFieldName: config.formFieldName+"Month",
            initialValue: initialMonth,
            classes: monthClasses,
            options: defaultMonthOptions,
            left: true])}
    ${ ui.includeFragment("uicommons", "field/text", [
            label: ui.message("uicommons.multipleInputDate.year.label"),
            id: config.formFieldName+"Year",
            formFieldName: config.formFieldName+"Year",
            initialValue: initialYear,
            classes: yearClasses,
            size: 5,
            maxLength: 4,
            min: minYear,
            max: maxYear,
            left: true])}
            
    <% if (config.showEstimated && config.initialValue) { %>
	     ${ ui.includeFragment("uicommons", "field/checkbox", [
	            label: ui.message("uicommons.multipleInputDate.estimated.label"),
	            id: config.formFieldName+"Estimated",
	            formFieldName: config.formFieldName+"Estimated",
	            checked: config.estimated,
	            dataAttributes: ["display-when-checked":"(" + ui.message("uicommons.multipleInputDate.estimated.label") + ")"],
	            left: true])}
	<% } %>
	
    <div class="clear"></div>
</p>
<% if (config.showEstimated) { %>
<script type="text/javascript">
    jQuery(function() {
        var yearsField = jQuery('#${config.formFieldName}Years-field');
        var monthsField = jQuery('#${config.formFieldName}Months-field');
        var estimatedField = jQuery('#${config.formFieldName}Estimated-field');

        var skipField = function() {
            e = jQuery.Event('keydown');
            e.which = 13; // enter
            yearsField.trigger(e);
        };

        var isExactDate = function() {
            var isEstimatedChecked = jQuery('#${config.formFieldName}Estimated-field').is(':checked');
            return (jQuery('#${config.formFieldName}-value').val() != '' && !isEstimatedChecked);
        }

        var toggleEstimatedDate = function() {
            if(isExactDate()) {
                yearsField.val('');
                yearsField.prop('disabled', true);
                monthsField.val('');
                monthsField.prop('disabled', true);
            } else {
                yearsField.prop('disabled', false);
                monthsField.prop('disabled', false);
            }
        };

        var clearExactDateFields = function() {
            ${config.formFieldName}Day = '';
            ${config.formFieldName}Month = '';
            ${config.formFieldName}Year = '';
            jQuery('#${config.formFieldName}Day-field').val('');
            jQuery('#${config.formFieldName}Month-field').val('');
            jQuery('#${config.formFieldName}Year-field').val('');

            if (${config.formFieldName}Year != '' && ${config.formFieldName}Month != '' && ${config.formFieldName}Day != '') {
                jQuery('#${config.formFieldName}-value').val(${config.formFieldName}Year+"-"+${config.formFieldName}Month+"-"+${config.formFieldName}Day);
            } else {
                jQuery('#${config.formFieldName}-value').val('');
            }
        }

        jQuery(estimatedField).change(function() {
            toggleEstimatedDate();
        });

        jQuery(yearsField).blur(function() {
            var elementValue = '';
            if(this.value && jQuery.trim(this.value).length > 0)
                elementValue = jQuery.trim(this.value);

            if(elementValue.length > 0) {
                ${config.formFieldName}Years = elementValue;
                clearExactDateFields();
            }else {
                ${config.formFieldName}Years = '';
            }

        });

        jQuery(monthsField).blur(function() {
            var elementValue = '';
            if(this.value && jQuery.trim(this.value).length > 0)
                elementValue = jQuery.trim(this.value);

            if(elementValue.length > 0) {
                ${config.formFieldName}Months = elementValue;
                clearExactDateFields();
            }else {
                ${config.formFieldName}Months = '';
            }

        });

        jQuery(yearsField).focus(toggleEstimatedDate);
        jQuery(monthsField).focus(toggleEstimatedDate);
    });
</script>
<p>&nbsp;</p>
<h3>${ ui.message("uicommons.or") }</h3>
<p>
    ${ ui.includeFragment("uicommons", "field/text", [
            label: ui.message("uicommons.multipleInputDate.estimatedYears.label"),
            id: config.formFieldName + "Years",
            formFieldName: config.formFieldName + "Years",
            maxLength: 3,
            min: 0,
            max: 120,
            classes: yearsClasses,
            appendToValue: " " + ui.message("uicommons.multipleInputDate.years.label"),
            left: true
    ])}

    ${ ui.includeFragment("uicommons", "field/text", [
            label: ui.message("uicommons.multipleInputDate.estimatedMonths.label"),
            id: config.formFieldName + "Months",
            formFieldName: config.formFieldName + "Months",
            maxLength: 2,
            min: 0,
            max: 11,
            classes: monthsClasses,
            appendToValue: " " + ui.message("uicommons.multipleInputDate.months.label"),
            left: true
    ])}
</p>
<% } %>

<input id="${config.formFieldName}-value" type="hidden" name="${config.formFieldName}" />
