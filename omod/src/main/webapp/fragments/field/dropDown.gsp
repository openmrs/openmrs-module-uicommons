<%
    config.require("formFieldName")
    config.require("options")

    def required = config.classes && config.classes.join(' ').contains("required");

    def selectDataBind = "";
    if (config.depends && config.depends.disable) {
        selectDataBind += "disable: ${ config.depends.variable }() == '${ config.depends.disable }'"
    }
    if (config.depends && config.depends.enable) {
        selectDataBind += "enable: ${ config.depends.variable }() == '${ config.depends.enable }'"
    }
    if (config.dependency || required) {
        selectDataBind += ", value: ${ config.id }"
    }

    def cleanup = {
        return (it instanceof org.codehaus.jackson.node.TextNode) ? it.textValue : it;
    }

    def otherAttributes = ''
    if (config.otherAttributes){
        config.otherAttributes.each{ attr, val ->
            otherAttributes += (' ' + attr + '="' + val + '"')
        }
    }
%>

<p id="${ config.id }"
    <% if (config.depends) { %> data-bind="visible: ${ config.depends.variable }() == '${ config.depends.value }'" <% } %>
    <% if (config.left) { %> class="left" <% } %>  >

    <label for="${ config.id }-field${ config.autocomplete ? '-input' : '' }">
        ${ ui.message(config.label) ?: '' } <% if (required) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %>
    </label>

    <% if (config.autocomplete) { %>
        <input id="${ config.id }-field-input" type="text" class="dropdown-field-textbox" autocomplete="do-not-fill" data-lpignore="true">
    <% } %>

    <select id="${ config.id }-field" name="${ config.formFieldName}"
            <% if (config.classes) { %> class="${ config.classes.join(' ') }" <% } %>
            <% if (config.expanded || config.maximumSize) { %> size="${ [config?.maximumSize, config.options.size() + (config.hideEmptyLabel ? 0 : 1)].min() }" <% } %>
            <% if (selectDataBind) { %> data-bind="${ selectDataBind }" <% } %> ${otherAttributes}
            <% if (config.autocomplete) { %> style="display: none;" <% } %>
    >
        <% if(!config.hideEmptyLabel) { %>
            <option value="">${ ui.message(config.emptyOptionLabel ?: '&nbsp;') }</option>
        <% } %>
        <% config.options.each {
            def selected = it.selected || it.value == config.initialValue || cleanup(it.value) == config.initialValue
        %>
            <option value="${ cleanup(it.value) }"  <% if (selected) { %>selected<% } %>>${ ui.message(cleanup(it.label)) }</option>
        <% } %>
    </select>

    ${ ui.includeFragment("uicommons", "fieldErrors", [ fieldName: config.formFieldName ]) }
</p>

<script type="text/javascript">

    var viewModel = viewModel || {};
    viewModel.validations = viewModel.validations || [];
    viewModel.${ config.id } = ko.observable();

    <% if (config.dependency || required) { %>

        <% if (required) { %>
        viewModel.validations.push(function() {
            return jq('#${ config.id }-field').is(':disabled') || (viewModel.${ config.id }() ? true : false);
        });
        <% } else { %>
        viewModel.validations.push(function() {
            viewModel.${ config.id }();
            return true;
        });
        <% } %>
    <% } %>

    <% if (config.autocomplete) { %>
        (function(jq) {
            let selectListElement = jq("#${ config.id }-field");
            let options = [];
            selectListElement.find('option').each(function () {
                let val = jq(this).val();
                if (val !== '') {
                    options.push({'label': jq(this).html(), 'value': val})
                }
            });
            let inputBox = jq("#${ config.id }-field-input");
            inputBox.autocomplete({
                source: options,
                minLength: 0,
                matchContains: true,
                select: function (event, ui) {
                    event.preventDefault();
                    inputBox.val(ui.item.label);
                    selectListElement.val(ui.item.value);
                    selectListElement.change();
                },
                focus: function (event, ui) {
                    // Override jQuery's strange default behavior, which is to auto-populate
                    // the input box with the select option value when focused with the arrow keys.
                    // We want the select option label.
                    if (event.which === 38 || event.which === 40) {
                        inputBox.val(ui.item.label);
                    }
                    return false;
                }
            }).blur(function () {
                if (inputBox.val() === "") {
                    selectListElement.val(null);
                }
            }).focus(function () {
                jq(this).autocomplete('search', jq(this).val());
            });
        })(jQuery);
    <% } %>

</script>
