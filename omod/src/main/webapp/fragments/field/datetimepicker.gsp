<%
    ui.includeJavascript("uicommons", "datetimepicker/bootstrap-datetimepicker.min.js")
    ui.includeJavascript("uicommons", "datetimepicker/locales/bootstrap-datetimepicker.${ org.openmrs.api.context.Context.getLocale() }.js")
    ui.includeCss("uicommons", "datetimepicker.css")

    config.require("id", "label", "formFieldName", "useTime")

    def required = config.classes && config.classes.contains("required")

    def defaultDateStringFormat
    if (config.useTime) {
        defaultDateStringFormat = new java.text.SimpleDateFormat("dd-MM-yyyy HH:mm")
    } else {
        defaultDateStringFormat = new java.text.SimpleDateFormat("dd-MM-yyyy")
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
        defaultDateString = defaultDateStringFormat.format(defaultDate)
        defaultDateISOFormatted = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(defaultDate)
    }

    def startDate
    if (config.startToday) {
        startDate = defaultDateString
    } else {
        startDate = config.startDate
    }

    def endDate
    if (config.endToday) {
        endDate = defaultDateString
    } else {
        endDate = config.endDate
    }
%>

<p id="${config.id}">
    <label for="${ config.id }-display">
        ${ ui.message(config.label) } <% if (required) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %>
    </label>
    <span id="${ config.id }-wrapper" class="date">
        <input type="text" id="${ config.id }-display" value="${ defaultDateString }" readonly />
        <span class="add-on"><i class="icon-calendar small"></i></span>
    </span>
    <input type="hidden" id="${ config.id }-field" name="${ config.formFieldName }" value="${ defaultDateISOFormatted }"
        <% if (config.classes) { %> class="${ config.classes.join(' ') }" <% } %>
        <% if (config.dependency || required) { %> data-bind="value: ${ config.id }" <% } %> />

    ${ ui.includeFragment("uicommons", "fieldErrors", [ fieldName: config.formFieldName ]) }
</p>

<script type="text/javascript">
    jq("#${ config.id }-wrapper").datetimepicker({
        <% if (!config.useTime) { %>
            minView: 2,
        <% } %>

        autoclose: true,
        pickerPosition: "bottom-left",
        todayHighlight: false,

        <% if (config.useTime) { %>
            format: "dd-mm-yyyy hh:ii",
        <% } else { %>
            format: "dd-mm-yyyy",
        <% } %>

        <% if (startDate) { %>
            startDate: "${ startDate }",
        <% } %>

        <% if (endDate) { %>
            endDate: "${ endDate }",
        <% } %>

        language: "${ org.openmrs.api.context.Context.getLocale() }",
        linkField: "${ config.id }-field",
        linkFormat: "yyyy-mm-dd hh:ii:ss"
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
