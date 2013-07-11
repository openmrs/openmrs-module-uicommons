<%
    config.require("label")
    config.require("formFieldName")
    if (config.classes && config.classes.contains("numeric-range")) {
        config.require("min", "max")
    }
%>

<p <% if (config.left) { %> class="left" <% } %> >
    <label for="${ config.id }-field">
        ${ config.label } <% if (config.classes && config.classes.contains("required")) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %>
    </label>
    <input type="text" id="${ config.id }-field" name="${ config.formFieldName }" value="${ config.initialValue ?: '' }"
           <% if (config.classes) { %>class="${ config.classes.join(' ') }" <% } %>
           <% if (config.size) { %> size="${ config.size }" <% } %>
            <% if (config.maxLength) { %> maxlength="${ config.maxLength }" <% } %>
           <% if (config.classes && config.classes.contains("numeric-range")) { %> min="${ config.min }" max="${ config.max }" <% } %> />
    ${ ui.includeFragment("uicommons", "fieldErrors", [ fieldName: config.formFieldName ]) }
    <% if (config.optional) { %>
        ${ ui.message("emr.optional") }
    <% } %>
</p>