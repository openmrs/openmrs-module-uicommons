<%
    // this fragment uses hardcoded ids for styling, and hardcoded function names, so it can only be used once on a page

    // defaults
    config.merge([
            targetPageProvider: "coreapps",
            targetPage: "patientdashboard/patientDashboard"
    ])
%>

<script type="text/javascript">
    jq(function() {
        jq('#patient-search-field-search').first().focus();

        jq('#patient-search-form').submit( function() {
            navigateToPatient(parseInt(jq('#patient-search-field-value').val()));
            return false;
        });
    });

    function findPatientLabelFunction(item) {
        var id = item.patientId;
        if(id > 0){
            if (item.primaryIdentifiers[0]) {
                id = item.primaryIdentifiers[0].identifier;
            }
            return  item.preferredName.fullName
                    + ' - ' + item.gender
                    + ' - ' + item.age
                    + ' - ' + id ;
        }
        return false;
    }

    function findPatientNavigateFunction(item) {
        if(item !== null && item.patientId > 0){
            navigateToPatient(item.patientId);
        }
        return true;
    }

    function navigateToPatient(patientId) {
        if(patientId > 0) {
            var returnFormUrl = ${ config.formUrl };
            console.log("returnFormUrl= " + returnFormUrl);
            if( returnFormUrl && returnFormUrl.length > 0){
                emr.navigateTo({
                    provider: '${ config.targetPageProvider }',
                    page: '${ config.targetPage }',
                    query: { patientId: patientId, formUrl: returnFormUrl }
                });
            }else{
                emr.navigateTo({
                    provider: '${ config.targetPageProvider }',
                    page: '${ config.targetPage }',
                    query: { patientId: patientId }
                });
            }

        }
    }
</script>

<form id="patient-search-form" class="patient-search-form">
    <label>
        <i class="icon-search small"></i>
        ${ ui.message("uicommons.searchPatientHeading") }
    </label>
    <div class="search-input">
        ${ ui.includeFragment("uicommons", "field/autocomplete", [
                id: "patient-search-field",
                cssClass: "scan-input",
                label: "",
                placeholder: ui.message("uicommons.searchByNameOrIdOrScan"),
                formFieldName: "patientId",
                fragment: "findPatient",
                action: "search",
                maxResults: 10,
                fragmentProvider: "coreapps",
                itemValueProperty: "patientId",
                itemLabelFunction: "findPatientLabelFunction",
                onExactMatchFunction: "findPatientNavigateFunction"
        ])}
    </div>
</form>