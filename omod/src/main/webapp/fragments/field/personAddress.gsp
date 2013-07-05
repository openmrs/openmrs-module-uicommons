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

<% addressTemplate.lines.each { line -> %>
        <% line.eachWithIndex { token, tokenIndex -> %>
            <% if (token.isToken == addressTemplate.layoutToken) { %>
            	 <p <% if (line.size() > 1 && tokenIndex == 1) { %> class="left clear" <% } else if (line.size() > 1) { %> class="left" <% } %> >
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
                    if (addressTemplate.elementRegexFormats && addressTemplate.elementRegexFormats[token.codeName]){
                        elementRegexFormat = addressTemplate.elementRegexFormats[token.codeName]
                    }
                    if (token.codeName == 'startDate' || token.codeName == 'endDate') { %>
                         ${ui.includeFragment("uicommons", "field/datetimepicker", [
                                id: token.codeName,
                                label: "",
                                formFieldName: token.codeName,
                                useTime: false,
                                left: true,
                                defaultDate: initialFieldValue,
                                size: token.displaySize
                        ])}
                    <% } else {%>
                        <input type="text" id="${ token.codeName }" name="${ token.codeName }" value="${(initialFieldValue) ? initialFieldValue : ''}" size="${ token.displaySize }"
                        <% if (addressTemplate.elementRegex && addressTemplate.elementRegex[token.codeName]) { %> onkeyup="validateFormat(this, '${addressTemplate.elementRegex[token.codeName]}','${token.codeName}' )"
                        <% }else if(token.codeName == "latitude" || token.codeName == "longitude"){%>
                               class="number numeric-range degrees" min="${(token.codeName == "latitude") ? "-90" : "-180"}" max="${(token.codeName == "latitude") ? "90" : "180"}"
                        <% } %>
                        />
                     <% } %>
        			<% if (addressTemplate.elementRegexFormats && addressTemplate.elementRegex[token.codeName]) { %>
	        			<i name="formatMsg_${token.codeName}" style="font-weight: normal; font-size: xx-small; color: red; display: none">
                                 <% if (addressTemplate.elementRegexFormats[token.codeName]) { %>
                                    (${ ui.message("general.format") }: ${addressTemplate.elementRegexFormats[token.codeName]})
                                <% } else { %>
                                    ${ ui.message("general.invalid") }&nbsp;${ ui.message("general.format") }
                                <% } %>
                        </i>
                    <% } %>
	        	</p> 
            <% } %>
        <% } %>
<% } %>
