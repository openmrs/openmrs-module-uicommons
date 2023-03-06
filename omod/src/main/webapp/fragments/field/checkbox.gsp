<%
    config.require("label")
    config.require("formFieldName")
%>

<p class="left">
	<label for="${ config.id }-field">${ config.label }</label>
    <input type="checkbox" id="${ config.id }-field" name="${ config.formFieldName }" <% if (config.checked  || (config.initialValue && config.value && config.initialValue == config.value)) { %>checked='checked'<% } %> <% if (config.value) { %>value="${ config.value }"<% } %>
    <% config.dataAttributes.each { %>
    	data-${ it.key } = "${ ui.escapeAttribute(it.value) }"
    <% } %>
    />
	
	<% if (!config.valueIsNotBoolean) { %>
		<% /* This hidden input ensures that a value of false is posted to the server when there is no selection */ %>
		<input type="hidden" name="${ config.formFieldName }" value="false">
	<% } %>
</p>
