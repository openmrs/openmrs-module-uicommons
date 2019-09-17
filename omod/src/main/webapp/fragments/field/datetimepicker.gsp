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
    def dateStringFormat2
    def useTime = config.useTime

    if (useTime instanceof String) {
        useTime = Boolean.parseBoolean(useTime)
    }

    if (useTime) {
        dateStringFormat = new java.text.SimpleDateFormat("dd MMM yyyy HH:mm", org.openmrs.api.context.Context.getLocale())
        dateISOFormatted = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
    } else {
        dateStringFormat = new java.text.SimpleDateFormat("dd MMM yyyy", org.openmrs.api.context.Context.getLocale())
        dateISOFormatted = new java.text.SimpleDateFormat("yyyy-MM-dd")
    }

    def defaultDate
    if (config.defaultToday) {
        defaultDate = new Date()
    } else {
        defaultDate = config.defaultDate
    }

    def defaultDateString = ""
    def defaultDateISOFormatted = ""
    if (defaultDate) {
        defaultDateString = dateStringFormat.format(defaultDate)
        defaultDateISOFormatted = dateISOFormatted.format(defaultDate)
    }

    def startDate
    if (config.startToday) {
        startDate = defaultDateString
    } else {
        startDate = config.startDate
        if (startDate instanceof String) {
            try {
                startDate = dateStringFormat.parse(startDate)
            } catch(Exception e) {
                dateStringFormat2 = new java.text.SimpleDateFormat("E MMM dd hh:mm:ss Z yyyy", org.openmrs.api.context.Context.getLocale())
                startDate = dateStringFormat2.parse(startDate)
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
                endDate = dateStringFormat.parse(endDate)
            } catch(Exception e) {
                dateStringFormat2 = new java.text.SimpleDateFormat("E MMM dd hh:mm:ss Z yyyy", org.openmrs.api.context.Context.getLocale())
                endDate = dateStringFormat2.parse(endDate)
            }
        }
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

        <% if (useTime) { %>
            format: "dd M yyyy hh:ii",
        <% } else { %>
            format: "dd M yyyy",
        <% } %>

        <% if (startDate) { %>
            startDate: "${ startDate instanceof Date ? dateStringFormat.format(startDate) : startDate }",
        <% } %>

        <% if (endDate) { %>
            endDate: "${ endDate instanceof Date ? dateStringFormat.format(endDate) : endDate }",
        <% } %>

        language: "${ org.openmrs.api.context.Context.getLocale() }",
        linkField: "${ config.id }-field",
        <% if (useTime) { %>
            linkFormat: "yyyy-mm-dd hh:ii:ss"
        <% } else { %>
            linkFormat: "yyyy-mm-dd"
        <% } %>
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
