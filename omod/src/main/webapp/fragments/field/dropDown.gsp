<%
    config.require("formFieldName")
    config.require("options")

    def required = config.classes && config.classes.contains("required");

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

    <label for="${ config.id }-field">
        ${ ui.message(config.label) ?: '' } <% if (required) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %>
    </label>

    <select id="${ config.id }-field" name="${ config.formFieldName}"
            <% if (config.classes) { %> class="${ config.classes.join(' ') }" <% } %>
            <% if (config.expanded || config.maximumSize) { %> size="${ [config?.maximumSize, config.options.size() + (config.hideEmptyLabel ? 0 : 1)].min() }" <% } %>
            <% if (selectDataBind) { %> data-bind="${ selectDataBind }" <% } %> ${otherAttributes}>

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

            // Create a new jQuery autocomplete text box, use it to update select list, which is hidden
            let options = [];
            selectListElement.find('option').each(function () {
                let val = jq(this).val();
                if (val !== '') {
                    options.push({'label': jq(this).html(), 'value': val})
                }
            });
            let inputBox = jq('<input type="text" class="dropdown-field-textbox" autocomplete="do-not-fill" data-lpignore="true">');
            inputBox.autocomplete({
                source: options,
                minLength: 0,
                matchContains: true,
                select: function (event, ui) {
                    event.preventDefault();
                    inputBox.val(ui.item.label);
                    selectListElement.val(ui.item.value);
                    selectListElement.change();
                    console.log("selected " + ui.item.label);
                },
                focus: function (event, ui) {
                    event.preventDefault();
                    inputBox.val(ui.item.label);
                },
            }).blur(function () {
                if (inputBox.val() !== selectListElement.find("option:selected").html()) {
                    inputBox.val(null);
                    selectListElement.val(null);
                }
            }).focus(function () {
                jq(this).autocomplete('search', jq(this).val());
            });
            inputBox.insertAfter(selectListElement);
            selectListElement.hide();
        })(jQuery);
    <% } %>

</script>

<style>
    #${ config.id }-field .ui-autocomplete {
        max-height: 300px;
        overflow-y: auto;   /* prevent horizontal scrollbar */
        overflow-x: hidden; /* add padding to account for vertical scrollbar */
        z-index:1000 !important;
    }
</style>