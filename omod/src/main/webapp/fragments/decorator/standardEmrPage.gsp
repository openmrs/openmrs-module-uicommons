<%
//    emrContext.requireAuthentication()

    ui.includeFragment("uiCommonsLibrary", "standardEmrIncludes")

    def title = config.title ?: ui.message("uiCommonsLibrary.title")
%>

<%
    // TODO: plug in header
    //%{--${ ui.includeFragment("patientDashboardApp", "header") }--}%
%>

<ul id="breadcrumbs"></ul>

<div id="body-wrapper">

    <%
        //    %{--${ ui.includeFragment("patientDashboardApp", "infoAndErrorMessage") }--}%
    %>

    <div id="content" class="container">
        <%= config.content %>
    </div>

</div>

<script id="breadcrumb-template" type="text/template">
    <li>
        {{ if (!first) { }}
        <i class="icon-chevron-right link"></i>
        {{ } }}
        {{ if (!last && breadcrumb.link) { }}
        <a href="{{= breadcrumb.link }}">
            {{ } }}
            {{ if (breadcrumb.icon) { }}
            <i class="{{= breadcrumb.icon }} small"></i>
            {{ } }}
            {{ if (breadcrumb.label) { }}
            {{= breadcrumb.label }}
            {{ } }}
            {{ if (!last && breadcrumb.link) { }}
        </a>
        {{ } }}
    </li>
</script>

<script type="text/javascript">
    jq(function() {
        emr.updateBreadcrumbs();
    });

    // global error handler
    jq(document).ajaxError(function(event, jqxhr) {
        emr.redirectOnAuthenticationFailure(jqxhr);
    });
</script>