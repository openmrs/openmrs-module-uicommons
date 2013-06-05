<%
    config.require("addressTemplate")

    def addressTemplate = config.addressTemplate;
%>

<table>
	<% addressTemplate.lines.each { line -> %>
		<tr>
	        <% line.eachWithIndex { token, tokenIndex -> %>
	            <% if (token.isToken == addressTemplate.layoutToken) { %>
	        		<td>${ ui.message(token.displayText) }</td>
	        		<td <% if (token == line.last() && tokenIndex < addressTemplate.maxTokens) { %> colspan="${addressTemplate.maxTokens - tokenIndex}" <% } %> >
	        			<input type="text" id="${ token.codeName }" name="${ token.codeName }" value="${ (addressTemplate.elementDefaults && addressTemplate.elementDefaults.get(token.codeName)) ? addressTemplate.elementDefaults.get(token.codeName) : '' }" size="${ token.displaySize }"/>
	        		</td>
	            <% } %>
	        <% } %>
		</tr>
	<% } %>
</table>
