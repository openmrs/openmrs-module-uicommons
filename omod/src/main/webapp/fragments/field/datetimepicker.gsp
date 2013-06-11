<%
    ui.includeJavascript("uicommons", "datetimepicker/bootstrap-datetimepicker.min.js")
    ui.includeJavascript("uicommons", "datetimepicker/locales/bootstrap-datetimepicker.${ org.openmrs.api.context.Context.getLocale() }.js")
    ui.includeCss("uicommons", "datetimepicker.css")

    config.require("id", "label", "formFieldName", "useTime")

    def required = config.classes && config.classes.contains("required")

    def today = new Date()
    def todayString;
    if (config.useTime) {
        todayString = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm").format(today)
    } else {
        todayString = new java.text.SimpleDateFormat("dd/MM/yyyy").format(today)
    }
    def date = ""
    def dateFormatted = ""
    if (config.defaultToday) {
        date = todayString
        dateFormatted = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(today)
    }
%>

<p id="${config.id}">
    <label for="${ config.id }-display">
        ${ ui.message(config.label) } <% if (required) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %>
    </label>
    <span id="${ config.id }-wrapper" class="date">
        <input type="text" id="${ config.id }-display" value="${ date }" readonly />
        <span class="add-on"><i class="icon-calendar small"></i></span>
    </span>
    <input type="hidden" id="${ config.id }-field" name="${ config.formFieldName }" value="${ dateFormatted }"
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
        <% if (config.useTime) { %>
        format: "dd/mm/yyyy hh:ii",
        <% } else { %>
        format: "dd/mm/yyyy",
        <% } %>
        <% if (config.startToday) { %>
        startDate: "${ todayString }",
        <% } %>
        <% if (config.endToday) { %>
        endDate: "${ todayString }",
        <% } %>
        language: "${ org.openmrs.api.context.Context.getLocale() }",
        linkField: "${ config.id }-field",
        linkFormat: "yyyy-mm-dd hh:ii:ss"
    })
    <% if (config.dependency || required) { %>
        .on('hide', function() {
            viewModel.${ config.id }(jq('#${ config.id }-field').val());
        });

        viewModel.${ config.id } = ko.observable("${ dateFormatted }");
        <% if (required) { %>
        viewModel.validations.push(function() {
            return viewModel.${ config.id }() ? true : false;
        });
        <% } %>
    <% } %>
</script>
