<%
    ui.includeJavascript("uicommons", "infoAndErrorMessage.js")
%>

<script type="text/javascript">
     <% if (infoMessage && toastMessage) { %>
        emr.successMessage("${ ui.encodeHtmlContent(ui.message(infoMessage))}");
    <% } %>
    <% if (errorMessage && toastMessage) { %>
           emr.errorMessage("${ ui.encodeHtmlContent(ui.message(errorMessage))}");
    <% } %>
</script>

<div id="error-message" class="note-container">
    <div class="note error" <% if (toastMessage || !errorMessage) { %> style="display: none" <% } %>>
        <div class="text">
            <i class="icon-remove medium"></i>
            <% if (errorMessage) { %>
                <p>${ ui.encodeHtmlContent(ui.message(errorMessage)) }</p>
            <% } %>
        </div>
        <div class="close-icon"><i class="icon-remove"></i></div>
    </div>
</div>

<div id="info-message" class="note-container">
    <div class="note success" <% if (toastMessage || !infoMessage) { %> style="display: none" <% } %>>
        <div class="text">
            <i class="icon-ok medium"></i>
            <% if (infoMessage) { %>
            <p>${ ui.encodeHtmlContent(ui.message(infoMessage)) }</p>
            <placeholder></placeholder>
            <% } %>
        </div>
        <div class="close-icon"><i class="icon-remove"></i></div>
    </div>
</div>