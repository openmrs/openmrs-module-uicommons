<%
    config.require("label")
    config.require("formFieldName")
    config.require("options")

    def required = config.classes && config.classes.join(' ').contains("required");
    def otherAttributes = ''
    if (config.otherAttributes){
        config.otherAttributes.each{ attr, val ->
            otherAttributes += (' ' + attr + '="' + val + '"')
        }
    }
%>


<label>${ config.label }
    <% if (required) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %></label>

<% config.options.eachWithIndex { it, idx ->
    def checked = it.checked || it.value == config.initialValue %>

    <p class="radio-btn">
        <input type="radio" id="${ config.id }-${ idx }-field" name="${ config.formFieldName }" value="${ it.value }" <% if (checked) { %>checked="true"<% } %>
            <% if (config.classes) { %> class="${ config.classes.join(' ') }" <% } %>
            <% if (config.dependency || required) { %> data-bind="checked: ${ config.id }" <% } %> ${otherAttributes} />
        <label for="${ config.id }-${ idx }-field">${ it.label }</label>
    </p>
<% } %>

${ ui.includeFragment("uicommons", "fieldErrors", [ id: config.formFieldName+'-field-error', fieldName: config.formFieldName ]) }

<% if (config.dependency || required) { %>
<script type="text/javascript">
    var viewModel = viewModel || {};
    viewModel.validations = viewModel.validations || [];

    viewModel.${ config.id } = ko.observable();
    <% if (required) { %>
    viewModel.validations.push(function() {
        return viewModel.${ config.id }() !== undefined;
    });
    <% } %>
</script>
<% } %>
