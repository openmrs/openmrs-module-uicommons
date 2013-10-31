<%
    ui.includeJavascript("uicommons", "datatables/jquery.dataTables.min.js")
%>



<script type="text/javascript">

    jq(function() {

        jq('${ config.object }').dataTable({

            <% config.options?.each { %>
                ${ it.key }: ${ it.value },
            <% } %>

            oLanguage:  {
                oPaginate: {
                    sFirst: "${ ui.message("uicommons.dataTable.first") }",
                    sLast: "${ ui.message("uicommons.dataTable.last") }",
                    sNext:  "${ ui.message("uicommons.dataTable.next") }",
                    sPrevious:  "${ ui.message("uicommons.dataTable.previous") }"
                },

                sInfo:  "${ ui.message("uicommons.dataTable.info") }",
                sSearch: "${ ui.message("uicommons.dataTable.search") }",
                sZeroRecords: "${ ui.message("uicommons.dataTable.zeroRecords") }",
                sEmptyTable: "${ ui.message("uicommons.dataTable.emptyTable") }",
                sInfoFiltered:  "${ ui.message("uicommons.dataTable.infoFiltered") }",
                sInfoEmpty:  "${ ui.message("uicommons.dataTable.infoEmpty") }",
                sLengthMenu:  "${ ui.message("uicommons.dataTable.lengthMenu") }",
                sLoadingRecords:  "${ ui.message("uicommons.dataTable.loadingRecords") }",
                sProcessing:  "${ ui.message("uicommons.dataTable.processing") }",

                oAria: {
                    sSortAscending:  "${ ui.message("uicommons.dataTable.sortAscending") }",
                    sSortDescending:  "${ ui.message("uicommons.dataTable.sortDescending") }"
                }
            }
        });

    });

</script>