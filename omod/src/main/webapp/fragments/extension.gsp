<%
    config.require("extension")
    config.require("contextModel")
%>

<% if (config.extension.type == 'link' || config.extension.type == 'script') { %>
    <a href="${ config.extension.url(contextPath, config.contextModel, config.contextModel?.returnUrl) }"
        <% if (config.extension?.extensionParams?.linkId) { %> id="${ ui.escapeAttribute( config.extension.extensionParams.linkId) }" <% } %> >
        <% if (config.extension.icon) { %> <i class="${ config.extension.icon }"></i> <% } %>
        <% if (config.extension.label) { %> ${ ui.message(config.extension.label) } <% } %>
    </a>
<% } else if (config.extension.type == 'include-fragment') { %>
    <%= ui.includeFragment(config.extension.extensionParams.provider, config.extension.extensionParams.fragment, [ contextModel: config.contextModel ]) %>
<% } %>