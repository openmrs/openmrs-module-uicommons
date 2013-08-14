<%
    config.require("formFieldName")
    config.require("fragment")
    config.require("action")
    config.require("itemValueProperty")
    config.require("itemLabelFunction")
    def fragmentProvider = config.fragmentProvider ?: "coreapps"
%>

<script type="text/javascript">
    jq(function() {
        var KEYCODE_ENTER = 13;
        var xhr=null;//used to track active ajax requests

        function setSearchValue(objectItem){
            jq('#${ config.id }-value').val(objectItem.${ config.itemValueProperty });
            if (${ config.itemLabelFunction }(objectItem)) {
                jq('#${ config.id }-search').val(${ config.itemLabelFunction }(objectItem));
            }
        };

        function handleEnterKey(){
            var patientId = jq('#${ config.id }-value').val();
            if(xhr){
                //ajax request in progress
                setTimeout(function(){
                    handleEnterKey();
                }, 300)
            }else{
                if(parseInt(patientId, 10) > 0){
                    navigateToPatient(patientId);
                }
            }
        }

        jq('#${ config.id }-search').keyup(function(event){
            if(event.keyCode == KEYCODE_ENTER){
                //allow ajax autocomplete to start
                setTimeout(function(){
                    handleEnterKey();
                }, 400)
            }
        });

        jq('#${ config.id }-search').autocomplete({
            source: function(request, response) {
                var ajaxUrl = '${ ui.actionLink(fragmentProvider, config.fragment, config.action)}';
                jq('#${ config.id }-value').val(0);
                if(xhr){
                    xhr.abort();
                    xhr = null;
                }
                xhr= jq.ajax({
                    url: ajaxUrl,
                    dataType: 'json',
                    data: { term: request.term , maxResults: ${config.maxResults} ? ${config.maxResults} : 0} ,
                    success: function (data) {
                        if (data.length == 0){
                            data.push({
                               patientId: 0,
                               label: '${ ui.message("emr.patient.notFound")}'
                            });
                        }
                        response(data);
                    }
                }).complete(function(){
                     xhr = null;
                }).error(function(){
                     xhr = null;
                     console.log("error on searching for patients");
                });
            },
            autoFocus: false,
            minLength: 2,
            delay: 300,
            select: function(event, ui) {
                //setSearchValue(ui.item);
                findPatientNavigateFunction(ui.item);
                return false;
            },
            focus: function(event, ui){
                setSearchValue(ui.item);
                return false;
            }
        });

        jq('#${ config.id }-search').data('autocomplete')._renderItem = function(ul, item) {
            return jq('<li>')
                    .data('item.autocomplete', item)
                    .append('<a>' + ((item.patientId == 0) ? item.label : (${ config.itemLabelFunction }(item))) + '</a>')
                    .appendTo(ul);
        };

        jq('#${ config.id }-search').data('autocomplete')._renderMenu = function(ul, items){
            var self= this;
            var fieldId =  '${ config.id }';
            if (items.length == 1 && (items[0].patientId > 0)) {
                jq('#${ config.id }-value').val(items[0].patientId);
            }
            jq.each( items , function(i, item) {
                self._renderItem(ul, item);
            });


        };
    });
</script>

<% def value = (config.value!=null) ? config.value : "" %>
<% def disabled = (config.disabled) ? "disabled=disabled" : "" %>

<span class="autocomplete-label">${ config.label }</span>
<div <% if (config.cssClass){ %> class="${config.cssClass}"<% } %>>
    <input type="hidden" class="field-value" id="${ config.id }-value" name="${ config.formFieldName }" <%=  (config.patientId!=null && config.patientId!="" ) ? "value=" + config.patientId : ""  %>  />
    <input type="text" class="field-display" id="${ config.id }-search" ${disabled} placeholder="${ config.placeholder ?: '' }" value="${value}" size="40"/>
</div>

<span class="field-error" style="display: none"></span>