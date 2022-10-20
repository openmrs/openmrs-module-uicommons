<%
    ui.includeJavascript("uicommons", "datetimepicker/bootstrap-datetimepicker.min.js")
    if(org.openmrs.api.context.Context.getLocale().getLanguage() != "en"){
        ui.includeJavascript("uicommons", "datetimepicker/locales/bootstrap-datetimepicker.${ org.openmrs.api.context.Context.getLocale() }.js")
    }
    ui.includeCss("uicommons", "datetimepicker.css")

    config.require("id", "label", "formFieldName", "useTime")

    def required = config.classes && config.classes.join(' ').contains("required")
    def useTime = config.useTime instanceof String ? Boolean.parseBoolean(config.useTime) : false
    def convertTimezones = ui.convertTimezones()

    def stringDateFormat = config.stringDateFormat ?: (useTime ? "dd MMM yyyy hh:mm" : "dd MMM yyyy")
    def isoDateFormat = config.isoDateFormat ?: (useTime ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd")
    def dateStringFormat = new java.text.SimpleDateFormat(stringDateFormat, org.openmrs.api.context.Context.getLocale())
    def dateISOFormatted = new java.text.SimpleDateFormat(isoDateFormat)

    def defaultDateString = ""
    def defaultDateISOFormatted = ""
    def defaultDate = config.defaultToday ? new Date() : config.defaultDate

    if (defaultDate && convertTimezones) {
        defaultDateString = ui.format(defaultDate)
        defaultDateISOFormatted = ui.dateToISOString(defaultDate)
    } else if (defaultDate) {
        defaultDateString = dateStringFormat.format(defaultDate)
        defaultDateISOFormatted = dateISOFormatted.format(defaultDate)
    }

    def extendedDateStringFormat = new java.text.SimpleDateFormat("E MMM dd HH:mm:ss Z yyyy", org.openmrs.api.context.Context.getLocale())
    def shortDateStringFormat = new java.text.SimpleDateFormat("dd-MM-yyyy", org.openmrs.api.context.Context.getLocale())

    def startDate
    if (config.startToday) {
        startDate = defaultDateString
    } else {
        startDate = config.startDate
        if (startDate instanceof String) {
            try {
                if(startDate.split("-").length == 1){
                    startDate = extendedDateStringFormat.parse(startDate)
                }else {
                    startDate = shortDateStringFormat.parse(startDate)
                }
            } catch(Exception dateWithoutTimeException) {
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
                if(endDate.split("-").length == 1){
                    endDate = extendedDateStringFormat.parse(endDate)
                }else {
                    endDate = shortDateStringFormat.parse(endDate)
                }
            } catch(Exception dateWithoutTimeException) {
            }
        }
    }

    def minuteStep = config.minuteStep?: 5
    def datePickerFormat = config.datePickerFormat ?:  "dd M yyyy hh:ii:ss"
    def datePickerLinkFormat = config.datePickerLinkFormat ?: (useTime ? "yyyy-mm-dd hh:ii:ss" : "yyyy-mm-dd")

    // see: "Advanced" section  of https://www.malot.fr/bootstrap-datetimepicker/demo.php for how this is supported
    // (basically, the datepicker has built-in support for reset based around added an element with the "icon-remove" class)
    def clearButton = config.clearButton
%>

<span id="${config.id}"
    <% if (config.depends) { %> data-bind="visible: ${ config.depends.variable }() == '${ config.depends.value }'" <% } %> >
    <label for="${ config.id }-display">
        ${ ui.message(config.label) } <% if (required) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %>
    </label>
    <span id="${ config.id }-wrapper" class="date">
        <input type="text" id="${ config.id }-display" value="${ defaultDateString }" size="${config.size}" readonly <% if (config.classes) { %>class="date${(useTime) ? ' use-time': ''} ${ config.classes.join(' ')}" <% } %> <% if ( config.ngModel ) { %>ng-model="${config.ngModel}" <% } %> />
        <span class="add-on">
            <i class="icon-calendar small"></i>
            <% if (clearButton) { %>
                <i class="icon-remove small"></i>
            <% } %>
        </span>
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
            <% if (convertTimezones) { %>
                startDate: "${ startDate instanceof Date ? ui.format(startDate) : startDate }",
            <% } else { %>
                startDate: "${ startDate instanceof Date ? dateISOFormatted.format(startDate) : startDate }",
            <% } %>
        <% } %>

        <% if (endDate) { %>
            <% if (convertTimezones) { %>
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

    //Convert to client timezone.
    <% if (convertTimezones && useTime) { %>
        jQuery("#${ config.id }-wrapper").datetimepicker().on('show hide', function(e) {
            var dateOnUTC = jq("#${ config.id }-field").val();
            if (dateOnUTC != '') {
                jq("#${ config.id }-field").val(new Date(dateOnUTC))
                moment.locale("${ ui.getLocale() }")
                <%   def format = "YYYY-MM-DDTHH:mm:ss.sssZ" %>
                jq("#${ config.id }-field").val(moment(dateOnUTC).format("${format}"));
            }
        })
    <% } else {  %>
        jQuery("#${ config.id }-wrapper").datetimepicker().on('show hide', function(e) {
            var dateOnUTC = jq("#${ config.id }-field").val();
            if (dateOnUTC != '') {
                jq("#${ config.id }-field").val(new Date(dateOnUTC))
                <%   def displayFormat = "DD MMM YYYY" %>
                <%   def inputFormat = "YYYY-MM-DD HH:mm:ss" %>
                jq("#${ config.id }-display").val(moment(dateOnUTC).format("${displayFormat}"));
                jq("#${ config.id }-field").val(moment(dateOnUTC).format("${inputFormat}"))
            }
        })
    <% } %>
</script>
