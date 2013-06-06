<script type="text/javascript">

    // The originally defined onSubmit function
    // We replace this with "return false;" until all errors are fixed
    var origOnSubmit = null;

    // to know if we have overwritten the onsubmit method already
    var overwrittenOnSubmit = false;
    
    /**
     * Validate the input format according to the regular expression.
     * If not valid, the background is highlighted and a formatting Hint is displayed.
     *
     * @param obj the input dom object
     * @param regex regular expression defined in the localized AddressTemplate in openmrs-servlet.xml
     * @param codeName the token.codeName (e.g.: "latitude")     
     */
    function validateFormat(obj, regex, codeName) {
        var formatMsg = "formatMsg_" + codeName;
        var resultArray = obj.value.match(regex);
        var tips = document.getElementsByName(formatMsg);
        if (resultArray || obj.value == null || obj.value == "") {
            obj.style.background="";
            for (var i=0; i<tips.length; i++) {
                tips[i].style.display = "none";
            }
            if (overwrittenOnSubmit) {
            	// replace the parent form's onsubmit with the one
            	// we saved because we put in a temporary "return false" in the onsubmit
            	obj.form.onsubmit = origOnSubmit;
            	origOnSubmit = null;
        		overwrittenOnSubmit = false;
            }
        }
        else {
            obj.style.background="yellow";
            for (var i=0; i<tips.length; i++) {
                tips[i].style.display = "";
            }

            if (!overwrittenOnSubmit) {
        		// this is the first time there was an error, save the current
        		// onSubmit for the form and replace it with a popup error msg
        		origOnSubmit = obj.form.onsubmit;
        		obj.form.onsubmit = function() { alert('${ ui.message("fix.error.plain") }'); return false; };
        		overwrittenOnSubmit = true;
        	}
        }
        
    }
    
</script>
    
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
	        			<input type="text" id="${ token.codeName }" name="${ token.codeName }" value="${ (addressTemplate.elementDefaults && addressTemplate.elementDefaults.get(token.codeName)) ? addressTemplate.elementDefaults.get(token.codeName) : '' }" size="${ token.displaySize }"
	        			<% if (token.codeName == 'startDate' || token.codeName == 'endDate') { %> onfocus='showCalendar(this,60)' <% } %>
	        			<% if (addressTemplate.elementRegex[token.codeName]) { %> onkeyup="validateFormat(this, '${addressTemplate.elementRegex[token.codeName]}','${token.codeName}' )" <% } %>
	        			/>
	        			<i name="formatMsg_${token.codeName}" style="font-weight: normal; font-size: xx-small; color: red; display: none">
                                 <% if (addressTemplate.elementRegexFormats[token.codeName] != null) { %>
                                    (${ ui.message("general.format") }: ${addressTemplate.elementRegexFormats[token.codeName]})
                                <% } else { %>
                                    ${ ui.message("general.invalid") }&nbsp;${ ui.message("general.format") }
                                <% } %>
                        </i>
	        		</td>
	            <% } %>
	        <% } %>
		</tr>
	<% } %>
</table>
