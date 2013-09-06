<%
    config.require("label")
    config.require("formFieldName")
%>

<p class="left">
	<label for="${ config.id }-field">${ config.label }</label>
    <input type="checkbox" id="${ config.id }-field" name="${ config.formFieldName }" <% if (config.checked) { %>checked='checked'<% } %> <% if (config.value) { %>value="${ config.value }"<% } %> <% if (config.dataDisplayWhenChecked) { %>dataDisplayWhenChecked="${ config.dataDisplayWhenChecked }"<% } %> <% if (config.dataDisplayWhenUnchecked) { %>dataDisplayWhenUnchecked="${ config.dataDisplayWhenUnchecked }"<% } %> />
	
	<% /* This hidden input ensures that a value of false is posted to the server when there is no selection */ %>
	<input type="hidden" name="${ config.formFieldName }" value="false">
</p>