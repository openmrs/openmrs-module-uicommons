<%
    ui.decorateWith("uicommons", "html5")

    ui.includeCss("uicommons", "styleguide/index.css")
    ui.includeJavascript("uicommons", "jquery-1.12.4.min.js");
    ui.includeJavascript("uicommons", "bootstrap-scrollspy.js");
    ui.includeJavascript("uicommons", "typeahead.js");
    ui.includeJavascript("uicommons", "script.js");
%>
<script>
    var jq = jQuery;
</script>
<body data-spy="scroll" data-target="#menu">
  <header id="style-guide-header">
        <h1>OpenMRS RAP Style Guide</h1>
        <h2>Customize your OpenMRS application with reusable fragments.</h2>
        <nav>
            <ul>
                <li><a href="${ui.pageLink("uicommons", "styleGuide")}">Base Style</a></li>
                <li><a class="active" href="${ui.pageLink("uicommons", "javascript")}">Javascript</a></li>
                <li><a href="${ui.pageLink("uicommons", "testPage")}">Test Pages</a></li>
            </ul>
        </nav>
    </header>
    <div class="clear"></div>

  <div id="body-wrapper" class="style-guide">
      <aside id="menu-container">
          <section id="menu" >
              <h3>Javascript Elements</h3>
              <ul id="menu-list" class="nav">
                  <li>
                      <a href="#suggest">Auto Suggest</a>
                  </li>
                  <li>
                      <a href="#date">Date Picker</a>
                  </li>
              </ul>
          </section>
      </aside>
      <div id="content">
          <article id="suggest">
              <h1>Auto Suggest</h1>
              <section>
                <form>
                  <p>
                    <input id="typeahead" data-provide="typeahead" placeholder="Auto Suggest" type="text"></input>
                  </p>
                </form>
              </section>
          </article>
          <article id="date">
              <h1>Date Picker</h1>
              <section>
                <form>
                  ${ ui.includeFragment("uicommons", "field/datetimepicker", [ id: 'datetime', label: 'Date Picker', formFieldName: 'date picker', useTime: false ]) }
                  ${ ui.includeFragment("uicommons", "field/datetimepicker", [ id: 'datetime2', label: 'Date Time Picker', formFieldName: 'date time picker', useTime: true ]) }
                </form>
              </section>
          </article>
      </div>
  </div>
</body>