<%
    config.require("extension")
    config.require("contextModel")

    def applyMoustacheTemplate = { template, model ->
        model.each {
            template = template.replace("{{" + it.key + "}}", "" + it.value)
        }
        return template
    }
%>

<% if (config.extension.type == 'link') { %>
    <a href="/${ contextPath }/${ applyMoustacheTemplate(config.extension.url, config.contextModel) }">
        ${ config.extension.label }
    </a>
<% } %>