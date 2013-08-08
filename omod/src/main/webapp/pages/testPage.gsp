<%
    ui.decorateWith("uicommons", "html5")

    ui.includeCss("uicommons", "styleguide/index.css")
%>

<body data-spy="scroll" data-target="#menu">
  <header id="style-guide-header">
        <h1>OpenMRS RAP Style Guide</h1>
        <h2>Customize your OpenMRS application with reusable fragments.</h2>
        <nav>
            <ul>
                <li><a href="${ui.pageLink("uicommons", "styleGuide")}">Base Style</a></li>
                <li><a href="${ui.pageLink("uicommons", "javascript")}">Javascript</a></li>
                <li><a class="active" href="${ui.pageLink("uicommons", "testPage")}">Test Pages</a></li>
            </ul>
        </nav>
    </header>
    <div class="clear"></div>

  <div id="body-wrapper" class="style-guide">
    <div id="content">
      <h1>Grid Test Page</h1>
      <p><a href="${ui.pageLink("uicommons", "grid")}" target="blank_">Link to page</a></p>
      <h1>Fragments Test Page</h1>
      <p><a href="${ui.pageLink("uicommons", "fragments")}" target="blank_">Link to page</a></p>
      <h1>Icons Test Page</h1>
      <p><a href="${ui.pageLink("uicommons", "icons")}" target="blank_">Link to page</a></p>
      <h1>Summary Dashboard Test Page</h1>
      <p><a href="${ui.pageLink("uicommons", "dashboard")}" target="blank_">Link to page</a></p>
    </div>
  </div>
</body>