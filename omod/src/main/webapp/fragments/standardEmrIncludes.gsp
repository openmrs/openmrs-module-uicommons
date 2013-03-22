<%
    ui.includeJavascript("uiCommonsLibrary", "jquery-1.8.3.min.js", Integer.MAX_VALUE)
    ui.includeJavascript("uiCommonsLibrary", "jquery-ui-1.9.2.custom.min.js", Integer.MAX_VALUE - 10)
    ui.includeJavascript("uiCommonsLibrary", "underscore-min.js", Integer.MAX_VALUE - 10)
    ui.includeJavascript("uiCommonsLibrary", "knockout-2.1.0.js", Integer.MAX_VALUE - 15)
    ui.includeJavascript("uiCommonsLibrary", "emr.js", Integer.MAX_VALUE - 15)

    ui.includeCss("uiCommonsLibrary", "cupertino/jquery-ui-1.9.2.custom.min.css", Integer.MAX_VALUE - 10)

    // toastmessage plugin: https://github.com/akquinet/jquery-toastmessage-plugin/wiki
    ui.includeJavascript("uiCommonsLibrary", "jquery.toastmessage.js", Integer.MAX_VALUE - 20)
    ui.includeCss("uiCommonsLibrary", "jquery.toastmessage.css", Integer.MAX_VALUE - 20)

    // simplemodal plugin: http://www.ericmmartin.com/projects/simplemodal/
    ui.includeJavascript("uiCommonsLibrary", "jquery.simplemodal.1.4.4.min.js", Integer.MAX_VALUE - 20)

%>