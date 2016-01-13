<!DOCTYPE html>
<html>
    <head>
        <title>${ config.title ?: "OpenMRS" }</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="image/ico" href="/${ ui.contextPath() }/images/openmrs-favicon.ico"/>
        <link rel="icon" type="image/png\" href="/${ ui.contextPath() }/images/openmrs-favicon.png"/>
        ${ ui.resourceLinks() }
    </head>
    <body>
        <script type="text/javascript">
            var OPENMRS_CONTEXT_PATH = '${ ui.contextPath() }';
        </script>

        <%= config.content %>

    </body>
</html>