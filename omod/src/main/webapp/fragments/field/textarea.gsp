<%
	config.require("label")
	config.require("formFieldName")

	def rows = config.rows ?: 5;
	def cols = config.cols ?: 60;
%>

<p <% if (config.left) { %> class="left" <% } %> >
    <label for="${ config.id }-field">
        ${ config.label } <% if (config.classes && config.classes.join(' ').contains("required")) { %><span>(${ ui.message("emr.formValidation.messages.requiredField.label") })</span><% } %>
    </label>
    <textarea id="${ config.id }-field"
              class="form-control form-control-sm form-control-lg form-control-md field-value <% if (config.classes) { config.classes.join(' ') } %>"
              rows="${ rows }" cols="${ cols }" name="${ config.formFieldName }"
              <% if (config.maxlength) { %> maxlength="${ config.maxlength }" <% } %>
    >${ config.initialValue ?: "" }</textarea>
    ${ ui.includeFragment("uicommons", "fieldErrors", [ fieldName: config.formFieldName ]) }
</p>


