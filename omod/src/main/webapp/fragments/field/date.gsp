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
    def initialDay,initialMonth, initialYear
    def dayClasses = ["day", "number", "numeric-range", dateComponentClass]
    def monthClasses = ["month", dateComponentClass]
    def yearClasses = ["year", "number", dateComponentClass]
    if(config.monthOptions)
        defaultMonthOptions = config.monthOptions;

    if(config.classes){
        dayClasses.addAll(config.classes)
        monthClasses.addAll(config.classes)
        yearClasses.addAll(config.classes)
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
                    jQuery('#${config.formFieldName}-value').val(${config.formFieldName}Year+"-"+${config.formFieldName}Month+"-"+${config.formFieldName}Day);
                }
            });
        });
    });

</script>

<p id="${config.id}">
    ${ ui.includeFragment("uicommons", "fieldErrors", [ fieldName: config.formFieldName ]) }

    ${ ui.includeFragment("uicommons", "field/text", [
            label: ui.message("uicommons.multipleDateInputs.day.label"),
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
            label: ui.message("uicommons.multipleDateInputs.month.label"),
            id: config.formFieldName+"Month",
            formFieldName: config.formFieldName+"Month",
            initialValue: initialMonth,
            classes: monthClasses,
            options: defaultMonthOptions,
            left: true])}
    ${ ui.includeFragment("uicommons", "field/text", [
            label: ui.message("uicommons.multipleDateInputs.year.label"),
            id: config.formFieldName+"Year",
            formFieldName: config.formFieldName+"Year",
            initialValue: initialYear,
            classes: yearClasses,
            size: 5,
            maxLength: 4,
            left: true])}

    <input id="${config.formFieldName}-value" type="hidden" name="${config.formFieldName}" />
</p>
