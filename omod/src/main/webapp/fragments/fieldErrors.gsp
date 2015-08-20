<span <% if (config.id) { %>id="${config.id}"<% } %> class="field-error" <% if (!errorMessage) { %> style="display: none" <% } %>>
	<% if (errorMessage) { %> ${ errorMessage }<% } %>
</span>