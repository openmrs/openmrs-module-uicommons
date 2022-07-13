<%
    config.require("label")
    config.require("formFieldName")
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
        ${ config.label } <% if (config.classes && config.classes.join(' ').contains("required")) { %>
        <span>(${ ui.message("uicommons.requiredField.label") })</span> <% } %>
    </label>
    <input type="password" id="${ config.id }-field" name="${ config.formFieldName }" autocomplete="off"
        <% if (config.classes) { %>class="${ config.classes.join(' ') }" <% } %>
        <% if (config.size) { %> size="${ config.size }" <% } %>
        <% if (config.classes && config.classes.contains("regex")) { %> regex="${ config.regex }" <% } %>
        ${otherAttributes} />
    ${ ui.includeFragment("uicommons", "fieldErrors", [id: config.id+"-field-errors", fieldName: config.formFieldName ]) }

</p>
