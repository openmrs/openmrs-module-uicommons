<%
    ui.includeJavascript("uicommons", "datetimepicker/bootstrap-datetimepicker.min.js")
    if(org.openmrs.api.context.Context.getLocale().getLanguage() != "en"){
        ui.includeJavascript("uicommons", "datetimepicker/locales/bootstrap-datetimepicker.${ org.openmrs.api.context.Context.getLocale() }.js")
    }
    ui.includeCss("uicommons", "datetimepicker.css")

    config.require("id", "label", "formFieldName", "useTime")

    def required = config.classes && config.classes.contains("required")

    def dateStringFormat
    def dateISOFormatted
    def fallbackDateStringFormat
    def useTime = config.useTime

    if (useTime instanceof String) {
        useTime = Boolean.parseBoolean(useTime)
    }

    def stringDateFormat = config.stringDateFormat
    def isoDateFormat = config.isoDateFormat
    if (!stringDateFormat){
        stringDateFormat = useTime ? "dd MMM yyyy HH:mm" : "dd MMM yyyy"
    }
    if(!isoDateFormat){
        isoDateFormat = useTime ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd"
    }
    dateStringFormat = new java.text.SimpleDateFormat(stringDateFormat, org.openmrs.api.context.Context.getLocale())
    dateISOFormatted = new java.text.SimpleDateFormat(isoDateFormat)

    def defaultDate
    if (config.defaultToday) {
        defaultDate = new Date()
    } else {
        defaultDate = config.defaultDate
    }

    def defaultDateString = ""
    def defaultDateISOFormatted = ""
    if (defaultDate) {
        if( ui.convertTimezones() ) {
            if(useTime){
                defaultDateString = ui.format(defaultDate)
                defaultDateISOFormatted = ui.format(defaultDate)
            } else {
                defaultDateString = ui.formatDateWithClientTimezone(defaultDate)
                defaultDateISOFormatted = ui.formatDateWithClientTimezone(defaultDate)
            }
        } else {
            defaultDateString = dateStringFormat.format(defaultDate)
            defaultDateISOFormatted = dateISOFormatted.format(defaultDate)
        }
    }

    def startDate
    if (config.startToday) {
        startDate = defaultDateString
    } else {
        startDate = config.startDate
        if (startDate instanceof String) {
            try {
            	// parses date strings like (new Date().toString())
            	fallbackDateStringFormat = new java.text.SimpleDateFormat("E MMM dd HH:mm:ss Z yyyy", java.util.Locale.ENGLISH)
                startDate = fallbackDateStringFormat.parse(startDate)
            } catch(Exception e) {
            	// pass
            }
        }
    }

    def endDate
    if (config.endToday) {
        endDate = defaultDateString
    } else {
        endDate = config.endDate
        if (endDate instanceof String) {
            try {
            	// parses date strings like (new Date().toString())
            	fallbackDateStringFormat = new java.text.SimpleDateFormat("E MMM dd HH:mm:ss Z yyyy", java.util.Locale.ENGLISH)
                endDate = fallbackDateStringFormat.parse(endDate)
            } catch(Exception e) {
            	// pass
            }
        }
    }

    def minuteStep = config.minuteStep
    def datePickerFormat = config.datePickerFormat
    def datePickerLinkFormat = config.datePickerLinkFormat
    if(!minuteStep){
        minuteStep = 5
    }
    if(!datePickerFormat){
        datePickerFormat = useTime ? "dd M yyyy hh:ii" : "dd M yyyy"
    }
    if(!datePickerLinkFormat){
        datePickerLinkFormat = useTime ? "yyyy-mm-dd hh:ii:ss" : "yyyy-mm-dd"
    }
%>

<span id="${config.id}"
    <% if (config.depends) { %> data-bind="visible: ${ config.depends.variable }() == '${ config.depends.value }'" <% } %> >
    <label for="${ config.id }-display">
        ${ ui.message(config.label) } <% if (required) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %>
    </label>
    <span id="${ config.id }-wrapper" class="date">
        <input type="text" id="${ config.id }-display" value="${ defaultDateString }" size="${config.size}" readonly <% if (config.classes) { %>class="date${(useTime) ? ' use-time': ''} ${ config.classes.join(' ')}" <% } %> <% if ( config.ngModel ) { %>ng-model="${config.ngModel}" <% } %> />
        <span class="add-on"><i class="icon-calendar small"></i></span>
    </span>
    <input type="hidden" id="${ config.id }-field" name="${ config.formFieldName }" value="${ defaultDateISOFormatted }"
        <% if (config.classes) { %> class="${ config.classes.join(' ') }" <% } %>
        <% if (config.dependency || required) { %> data-bind="value: ${ config.id }" <% } %> />

    ${ ui.includeFragment("uicommons", "fieldErrors", [ fieldName: config.formFieldName ]) }
</span>

<script type="text/javascript">
    var viewModel = viewModel || {};
    viewModel.validations = viewModel.validations || [];

    jQuery("#${ config.id }-wrapper").datetimepicker({
        <% if (!useTime) { %>
            minView: 2,
        <% } %>
        autoclose: true,
        pickerPosition: "bottom-left",
        todayHighlight: false,
        minuteStep: ${minuteStep} ,
        format: "${datePickerFormat}",

        <% if (startDate) { %>
            <% if (ui.convertTimezones()) { %>
                startDate: "${ startDate instanceof Date ? ui.format(startDate) : startDate }",
            <% } else { %>
                startDate: "${ startDate instanceof Date ? dateISOFormatted.format(startDate) : startDate }",
            <% } %>
        <% } %>

        <% if (endDate) { %>
            <% if (ui.convertTimezones()) { %>
                endDate: "${ endDate instanceof Date ? ui.format(endDate) : endDate }",
            <% } else { %>
                endDate: "${ endDate instanceof Date ? dateISOFormatted.format(endDate) : endDate }",
            <% } %>
        <% } %>

        language: "${ org.openmrs.api.context.Context.getLocale() }",
        linkField: "${ config.id }-field",
        linkFormat: "${datePickerLinkFormat}"
    })
    <% if (config.dependency || required) { %>
        .on('hide', function() {
            viewModel.${ config.id }(jq('#${ config.id }-field').val());
        });

        viewModel.${ config.id } = ko.observable("${ defaultDateISOFormatted }");
        <% if (required) { %>
        viewModel.validations.push(function() {
            return viewModel.${ config.id }() ? true : false;
        });
        <% } %>
    <% } %>

</script>
