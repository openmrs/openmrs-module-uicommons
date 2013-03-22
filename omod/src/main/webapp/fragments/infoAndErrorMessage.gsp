<%
    ui.includeJavascript("emr", "infoAndErrorMessage.js")
%>

<script type="text/javascript">
    <% if (infoMessage && toastMessage) { %>
    emr.successMessage("${ ui.message(infoMessage)}");
    <% } %>
    <% if (errorMessage && toastMessage) { %>
    emr.errorMessage("${ ui.message(errorMessage)}");
    <% } %>
</script>

<div id="error-message" class="note error" <% if (toastMessage || !errorMessage) { %> style="display: none" <% } %>>
    <div class="icon"><i class="icon-remove medium"></i></div>
    <div class="text">
        <% if (errorMessage) { %>
        <p>${ ui.message(errorMessage) }</p>
        <% } %>
    </div>
    <div class="close-icon"><i class="icon-remove"></i></div>
</div>

<div id="info-message" class="note success" <% if (toastMessage || !infoMessage) { %> style="display: none" <% } %>>
    <div class="icon"><i class="icon-ok medium"></i></div>
    <div class="text">
        <% if (infoMessage) { %>
        <p>${ ui.message(infoMessage) }</p>
        <% } %>
    </div>
    <div class="close-icon"><i class="icon-remove"></i></div>
</div>