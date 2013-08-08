<%
    ui.decorateWith("uicommons", "html5")

    ui.includeCss("uicommons", "styleguide/index.css")
    ui.includeCss("uicommons", "styleguide/jquery.toastmessage.css")
    ui.includeCss("uicommons", "styleguide/jquery-ui-1.9.2.custom.min.css")
%>

<body data-spy="scroll" data-target="#menu">
  <header id="style-guide-header">
      <h1>OpenMRS Style Guide Grid Test Page</h1>
  </header>
    <ul class="grid-test">
      <span class="example">
        <article class="one column">
          <h2>Fluid Main</h2>
        </article>
        <article class="two column">
          <h2>Fluid Sidebar</h2>
        </article>
        <span class="clear"></span>
      </span>
      <span class="example">
        <article class="three">
          <span class="four column">
            <h2>Nested Inside</h2>
          </span>
          <span class="five column">
            <h2>Nested Inside</h2>
          </span>
          <span class="six column">
            <h2>Nested Inside</h2>
          </span>
          <span class="seven column">
            <h2>Nested Inside</h2>
          </span>
        </article>
        <article class="eight column">
          <h2>Sidebar</h2>
        </article>
      </span>
       <span class="example">
        <article class="nine column">
          <h2>Responsive Main</h2>
        </article>
        <article class="ten column">
          <h2>Responsive Sidebar</h2>
        </article>
      </span>
    </ul>
</body>