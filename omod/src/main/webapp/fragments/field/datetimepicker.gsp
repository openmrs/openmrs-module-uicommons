<%
    ui.includeJavascript("uicommons", "datetimepicker/bootstrap-datetimepicker.min.js")
    ui.includeJavascript("uicommons", "datetimepicker/locales/bootstrap-datetimepicker.${ emrContext.getUserContext().getLocale() }.js")
    ui.includeCss("uicommons", "datetimepicker.css")

    config.require("id", "label", "formFieldName", "useTime")

    def required = config.classes && config.classes.contains("required")
%>

<p id="${config.id}">
    <label for="${ config.id }-display">
        ${ ui.message(config.label) } <% if (required) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %>
    </label>
    <span id="${ config.id }-wrapper" class="date">
        <input type="text" id="${ config.id }-display" />
        <span class="add-on"><i class="icon-calendar small"></i></span>
    </span>
    <input type="hidden" id="${ config.id }-field" name="${ config.formFieldName }"
        <% if (config.classes) { %> class="${ config.classes.join(' ') }" <% } %>
        <% if (config.dependency || required) { %> data-bind="value: ${ config.observable }" <% } %> />

    ${ ui.includeFragment("uicommons", "fieldErrors", [ fieldName: config.formFieldName ]) }
</p>

<script type="text/javascript">
    jq("#${ config.id }-wrapper").datetimepicker({
        <% if (!config.useTime) { %>
        minView: 2,
        <% } %>
        autoclose: true,
        pickerPosition: "bottom-left",
        format: "dd/mm/yyyy",
        language: "${ emrContext.getUserContext().getLocale() }",
        linkField: "${ config.id }-field",
        linkFormat: "yyyy-mm-dd hh:ii:ss"
    });

    <% if (config.dependency || required) { %>
        viewModel.${ config.observable } = ko.observable();
        <% if (required) { %>
        viewModel.validations.push(function() {
            return viewModel.${ config.observable }() !== undefined;
        });
        <% } %>
    <% } %>
</script>
