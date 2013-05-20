<%
    config.require("label")
    config.require("formFieldName")
    config.require("options")
%>


<h3>${ config.label }
    <% if (config.classes && config.classes.contains("required")) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %></h3>

<% config.options.eachWithIndex { it, idx ->
    def checked = it.checked || it.value == config.initialValue %>

    <p class="radio-btn">
        <input type="radio" id="${ config.id }-${ idx }-field" name="${ config.formFieldName }" value="${ it.value }" <% if (checked) { %>checked="true"<% } %>
            <% if (config.classes) { %> class="${ config.classes.join(' ') }" <% } %>
            <% if (config.dependency || (config.classes && config.classes.contains("required"))) { %> data-bind="checked: ${ config.observable }" <% } %>/>
        <label for="${ config.id }-${ idx }-field">${ it.label }</label>
    </p>
<% } %>

${ ui.includeFragment("uicommons", "fieldErrors", [ fieldName: config.formFieldName ]) }

<% if (config.dependency || (config.classes && config.classes.contains("required"))) { %>
<script type="text/javascript">
    viewModel.${ config.observable } = ko.observable();
    <% if (config.classes && config.classes.contains("required")) { %>
    viewModel.validations.push(function() {
        return viewModel.${ config.observable }() !== undefined;
    });
    <% } %>
</script>
<% } %>
