<%
    config.require("label")
    config.require("formFieldName")
    // config supports withTag

    def options;
    def tagList = [];
    if (config.withTag) {
        tagArray = config.withTag.split(";")
        if(tagArray.size() >0){
            tagArray.each{ t ->
                def tag = t instanceof String ? context.locationService.getLocationTagByName(t) : t
                tagList.add(tag)
            }
        }
        options = context.locationService.getLocationsHavingAnyTag(tagList)
    } else {
        options = context.locationService.allLocations
    }
    options = options.collect {
        def selected = (it == config.initialValue);
        [ label: ui.format(it), value: it.id, selected: selected ]
    }
    options = options.sort { a, b -> a.label <=> b.label }
%>

${ ui.includeFragment("uicommons", "field/dropDown", [ options: options ] << config) }