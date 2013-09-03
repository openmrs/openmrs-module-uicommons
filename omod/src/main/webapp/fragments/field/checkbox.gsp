<%
    config.require("label")
    config.require("formFieldName")
%>

<p class="left">
	<label for="${ config.id }-field">${ config.label }</label>
    <input type="checkbox" id="${ config.id }-field" name="${ config.formFieldName }" <% if(config.checked){ %>checked='checked'<% } %> />
</p>