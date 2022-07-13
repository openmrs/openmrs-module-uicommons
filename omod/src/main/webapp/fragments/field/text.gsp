<%
    config.require("label")
    config.require("formFieldName")
    if (config.classes && config.classes.contains("numeric-range")) {
        config.require("min", "max")
    }
    if (config.classes && config.classes.contains("regex")) {
        config.require("regex")
    }
    def otherAttributes = ''
    if (config.otherAttributes){
        config.otherAttributes.each{ attr, val ->
            otherAttributes += (' ' + attr + '="' + val + '"')
        }
    }
%>

<p <% if (config.left) { %> class="left" <% } %> >
    <label for="${ config.id }-field">
        ${ config.label } <% if (config.classes && config.classes.join(' ').contains("required")) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %>
    </label>
    <input type="text" id="${ config.id }-field" name="${ config.formFieldName }" value="${ config.initialValue ?: '' }"
           <% if (config.classes) { %>class="${ config.classes.join(' ') }" <% } %>
           <% if (config.size) { %> size="${ config.size }" <% } %>
           <% if (config.maxLength) { %> maxlength="${ config.maxLength }" <% } %>
           <% if (config.classes && config.classes.contains("regex")) { %> regex="${ config.regex }" <% } %>
           <% if (config.classes && config.classes.contains("numeric-range")) { %> min="${ config.min }" max="${ config.max }" <% } %>
            ${otherAttributes} />
    <% if (config.appendToValueDisplayed) { %><span class="append-to-value">${config.appendToValueDisplayed}</span><% } %>
    ${ ui.includeFragment("uicommons", "fieldErrors", [ fieldName: config.formFieldName ]) }
    <% if (config.appendToValue) { %><span class="append-to-value hidden">${config.appendToValue}</span><% } %>
    <% if (config.optional) { %>
        ${ ui.message("emr.optional") }
    <% } %>
</p>
