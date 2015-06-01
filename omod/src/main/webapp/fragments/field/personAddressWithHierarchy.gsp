<%
    ui.includeJavascript("uicommons", "field/personAddressWithHierarchy.js")
%>
<div id="${ config.id }-container">

    <% if (config.shortcutFor) {
        def shortcutDisplay = ui.message(addressTemplate.nameMappings[config.shortcutFor])
    %>
        <p>
            <label><em>(Optional) Quick search by ${ shortcutDisplay }</em></label>
            <input type="text" class="address-hierarchy-shortcut" size="60" placeholder="${ui.escapeAttribute(shortcutDisplay)}, or skip to search manually"/>
        </p>
    <% } %>

    <% levels.each { level ->
        def classes = [ "level" ]
        if (config.required && level.required) {
            classes.add("required")
        }
        def levelInitial = ""
        if (initialValue) {
            // setting this as "value" on the input is not sufficient to set the js state, but we do it anyway
            // so that these values are immediately visible on page load
            levelInitial = initialValue[level.addressField.name] ?: ""
        }
    %>
        <p>
            <label>${ ui.message(addressTemplate.nameMappings[level.addressField.name]) }</label>
            <input class="${ classes.join(" ") }" type="text" autocomplete="off" size="40" name="${ config.fieldMappings?.get(level.addressField.name)?.getTextValue() ?: level.addressField.name }" id="${ config.id }-${ level.addressField.name }" value="${ ui.escapeAttribute(levelInitial) }"/>
            ${ ui.includeFragment("uicommons", "fieldErrors", [fieldName: level.addressField.name]) }
        </p>
    <% } %>
</div>

<script type="text/javascript">

    var personAddressWithHierarchy = {
        id: null,
        container: null,
        initialValue: null,
        shortcutFor: null,
        manualFields: []
    }

    personAddressWithHierarchy.id = '${ config.id }';
    personAddressWithHierarchy.container = jq('#${ config.id }-container');
    <% if (config.shortcutFor) { %>
        personAddressWithHierarchy.shortcutFor = '${ ui.escapeJs(config.shortcutFor) }';
    <% } %>
    <% if (config.manualFields) { %>
        <% config.manualFields.each { %>
            personAddressWithHierarchy.manualFields.push(${ it }); // since this comes from json config, it's a jackson text node, so we don't put quotes
        <% } %>
    <% } %>
    <% if (initialValue) { %>
        personAddressWithHierarchy.initialValue = ${ ui.toJson(initialValue) };
    <% } %>

    PersonAddressWithHierarchy(personAddressWithHierarchy);

</script>