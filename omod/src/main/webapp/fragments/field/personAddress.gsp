<%
    config.require("addressTemplate")

    def addressTemplate = config.addressTemplate;
%>

<% addressTemplate.lines.each { line -> %>
        <% line.eachWithIndex { token, tokenIndex -> %>
            <% if (token.isToken == addressTemplate.layoutToken) { %>
            	 <p class="left">
					<label name="${ token.codeName }">
	        			${ ui.message(token.displayText) }
	        		</label>
	        		<%
                    def initialFieldValue
                    if(config.initialValue && config.initialValue[token.codeName]){
                        initialFieldValue = config.initialValue[token.codeName]
                    }else {
                        initialFieldValue = (addressTemplate.elementDefaults && addressTemplate.elementDefaults.get(token.codeName)) ? addressTemplate.elementDefaults.get(token.codeName) : ''
                    }
                    if (token.codeName == 'startDate' || token.codeName == 'endDate') { %>
                         ${ui.includeFragment("uicommons", "field/datetimepicker", [
                                id: token.codeName,
                                label: "",
                                formFieldName: token.codeName,
                                useTime: false,
                                left: true,
                                initialValue: initialFieldValue,
                                size: token.displaySize
                        ])}
                    <% } else {
                            def classes = ""
                            def otherAttributes = ""
                            if (addressTemplate.elementRegex && addressTemplate.elementRegex[token.codeName]){
                                if(addressTemplate.elementRegex[token.codeName] == "\\S+"){
                                    classes+="required"
                                }else{
                                    classes+="regex"
                                    otherAttributes+=("regex=\""+ addressTemplate.elementRegex[token.codeName]+"\"")
                                }
                            }else if(token.codeName == "latitude" || token.codeName == "longitude"){
                                classes+="number numeric-range"
                                otherAttributes+=("min=\""+(token.codeName == "latitude" ? "-90" : "-180")+"\"")
                                otherAttributes+=("max=\""+(token.codeName == "latitude" ? "90" : "180")+"\"")
                            }
                    %>
                        <input type="text" id="${ token.codeName }" name="${ token.codeName }" value="${(initialFieldValue) ? ui.encodeHtmlAttribute(initialFieldValue) : ''}" size="${ token.displaySize }" class="${ classes }" ${ otherAttributes } />
                        ${ ui.includeFragment("uicommons", "fieldErrors", [fieldName: token.codeName]) }
                    <% } %>
	        	</p>
	        	<% if (tokenIndex == line.size() - 1) { %> <p class="clear" ></p> <% } %>  
            <% } %>
        <% } %>
<% } %>
