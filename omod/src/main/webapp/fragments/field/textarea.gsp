<%
	config.require("label")
	config.require("formFieldName")

	def rows = config.rows ?: 5;
	def cols = config.cols ?: 60;
%>

<textarea class="field-value" rows="${ rows }" cols="${ cols }" name="${ config.formFieldName }">${ config.initialValue ?: "" }</textarea>

${ ui.includeFragment("uicommons", "fieldErrors", [ fieldName: config.formFieldName ]) }