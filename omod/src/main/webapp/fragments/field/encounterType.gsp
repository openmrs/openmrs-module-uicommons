<%
    config.require("label")
    config.require("formFieldName")

    def options;

    options = context.encounterService.allEncounterTypes

    options = options.collect {
        def selected = (it == config.initialValue);
        [ label: ui.format(it), value: it.id, selected: selected ]
    }
    options = options.sort { a, b -> a.label <=> b.label }
%>

${ ui.includeFragment("uicommons", "field/dropDown", [ options: options ] << config) }