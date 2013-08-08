<%
    ui.decorateWith("uicommons", "html5")

    ui.includeCss("uicommons", "styleguide/index.css")
    ui.includeCss("uicommons", "styleguide/jquery.toastmessage.css")
    ui.includeCss("uicommons", "styleguide/jquery-ui-1.9.2.custom.min.css")
%>

<body data-spy="scroll" data-target="#menu">
      <header id="style-guide-header">
        <h1>OpenMRS Style Guide Test Page</h1>
    </header>
    <div class="clear"></div>

    <div id="body-wrapper" class="test-page">
      <div class="example">
          <ul id="breadcrumbs">
              <li>
                  <a href="#">
                  <i class="icon-home small"></i></a>
              </li>
              <li>
                  <i class="icon-chevron-right link"></i>
                  <a href="#">Ramos, Glauber</a>
              </li>
              <li>
                  <i class="icon-chevron-right link"></i>Visits
              </li>
          </ul>
      </div>
      <ul class="grid">
          <li>
              <a class="button" href="#">
                  Simple button
              </a>
          </li>
          <li>
              <a class="button" href="#">
                  <i class ="icon-medical"></i>
                  Button with icon
              </a>
          </li>
          <li>
              <a class="button medium " href="#">
                  <i class ="icon-medical"></i>
                  Button with medium icon
              </a>
          </li>
          <li>
              <a class="button big " href="#">
                  <i class ="icon-medical"></i>
                  Button with big icon
              </a>
          </li>
          <li>
              <a class="button confirm" href="#">
                  Confirm simple button
              </a>
          </li>
          <li>
              <a class="button cancel" href="#">
                  <i class ="icon-medical"></i>
                  Cancel button with icon
              </a>
          </li>
          <li>
              <a class="button big disabled" href="#">
                  <i class ="icon-medical"></i>
                  Disabled button with big icon
              </a>
          </li>
          <li>
              <a class="button big app" href="#">
                  <i class ="icon-medical"></i>
                   App button with big icon
              </a>
          </li>
          <li>
              <a class="button task" href="#">
                  <i class ="icon-medical"></i>
                  Task button
              </a>
          </li>
          <li>
              <a class="button arrow" href="#">
                  <i class="icon-medical"></i>
                  <span>Arrow Button</span>
                  <span class="arrow-border-button"></span>
                  <span class="arrow-button"></span>
              </a>
          </li>
          <li>
              <a class="button arrow disabled" disabled="" href="#">
                  <i class="icon-medical"></i>
                  <span>Arrow Button</span>
                  <span class="arrow-border-button"></span>
                  <span class="arrow-button"></span>
              </a>
          </li>
      </ul>
       <div class="example">
          <div class="dialog">
              <div class="dialog-header">
                  <i class="icon-folder-open"></i>
                  <h3> Request Paper Record </h3>
              </div>
              <div class="dialog-content">
                  <p>
                      <em> Please confirm: </em>
                  <ul>
                      <li class="info">
                        <span> Patient </span>
                        <h5> Paul, Petter </h5>
                      </li>
                      <li class="info">
                        <span class="Location"></span>
                        <h5> ER </h5>
                      </li>
                  </ul>
                  
                  <span class="button confirm right"> Confirm </span>
                  <span class="button cancel"> Cancel </span>
              </div>
          </div>
        
          <div class="dialog">
              <div class="dialog-header">
                <i class="icon-folder-open"></i>
                <h3> Send Paper Record </h3>
              </div>
              <div class="dialog-content">
                  <p>
                      <em> This paper record isn't in the queue. If you want to proceed please select a location: </em>
                  <ul>
                      <li class="info">
                        <span> Patient </span>
                        <h5> Paul, Petter </h5>
                      </li>
                      <li>
                          <span class="Location"></span>
                          <select size="4">
                              <option>Emergency Room</option>
                              <option>Antepartum ward</option>
                              <option>Labor and Delivery</option>
                              <option>Dental</option>
                              <option>Central Archives</option>
                          </select>
                      </li>
                  </ul>
                 
                  <span class="button confirm right"> Confirm </span>
                  <span class="button cancel"> Cancel </span>
              </div>
          </div>
      </div>
      <div class="example">
          <div id="error-message" class="note-container">
              <div class="note error">
                  <div class="text">
                      <i class="icon-remove medium"></i>
                      
                          <p>Nom d'utilisateur ou mot de passe incorrect!</p>
                      
                  </div>
                  <div class="close-icon"><i class="icon-remove"></i></div>
              </div>
          </div>
          <div id="error-message" class="note-container">
              <div class="note success">
                  <div class="text">
                      <i class="icon-remove medium"></i>
                      
                          <p>Nom d'utilisateur ou mot de passe incorrect!</p>
                      
                  </div>
                  <div class="close-icon"><i class="icon-remove"></i></div>
              </div>
          </div>
          <div id="error-message" class="note-container">
              <div class="note warning">
                  <div class="text">
                      <i class="icon-remove medium"></i>
                      
                          <p>Nom d'utilisateur ou mot de passe incorrect!</p>
                      
                  </div>
                  <div class="close-icon"><i class="icon-remove"></i></div>
              </div>
          </div>
      </div>
      <div class="example">
          <div class="toast-container">
              <div class="toast-item-wrapper">
                  <div class="toast-item toast-type-success">
                      <div class="toast-item-image toast-item-image-success"></div>
                      <div class="toast-item-close"></div>
                      <p>The selected record(s) have been assigned</p>
                  </div>
              </div>
          </div>
          <div class="toast-container">
              <div class="toast-item-wrapper">
                  <div class="toast-item toast-type-error">
                      <div class="toast-item-image toast-item-image-error"></div>
                      <div class="toast-item-close"></div>
                      <p>The selected record(s) haven't been assigned</p>
                  </div>
              </div>
          </div>
           <div class="toast-container">
              <div class="toast-item-wrapper">
                  <div class="toast-item toast-type-alert">
                      <div class="toast-item-image toast-item-image-alert"></div>
                      <div class="toast-item-close"></div>
                      <p>The selected record(s) haven't been assigned</p>
                  </div>
              </div>
          </div>
          <div class="toast-container">
              <div class="toast-item-wrapper">
                  <div class="toast-item toast-type-success">
                      <div class="toast-item-image toast-item-image-success icon-ok"></div>
                      <div class="toast-item-close icon-remove"></div>
                      <p>
                          <span class="toast-record-found">
                              Send to:
                              <span class="toast-record-location">Emergency</span>
                              Dossier id:
                              <span class="toast-record-id">A166009</span>
                          </span>
                      </p>
                  </div>
              </div>
          </div>
      </div>
      <div class="example small-div">
          <form class="patient-search-form">
              <label>
                  <i class="icon-search small"></i>
                  Search for a patient (scan card, by ID or name):
              </label>
              <div class="search-input">
                  <div class="scan-input">
                      <input type="text" class="field-display ui-autocomplete-input" placeholder="Eg: Y2A4G4" size="40">
                  </div>
              </div>
          </form>
      </div>
      <div class="example">
          <form class="patient-search-form">
              <label>
                  <i class="icon-search small"></i>
                  Search for a patient (scan card, by ID or name):
              </label>
              <div class="search-input">
                  <div class="scan-input">
                      <input type="text" class="field-display ui-autocomplete-input" placeholder="Eg: Y2A4G4" size="40">
                  </div>
              </div>
          </form>
      </div>

      <div class="example">
          <div class="ui-tabs">
              <ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
                  <li class="ui-state-default ui-corner-top ui-tabs-active ui-state-active">
                      <a class="ui-tabs-anchor">
                          Tab1
                      </a>
                  </li>
                  <li class="ui-state-default ui-corner-top" >
                      <a class="ui-tabs-anchor">
                          Tab2
                      </a>
                  </li>
              </ul>
              <div class="ui-tabs-panel ui-widget-content ui-corner-bottom">
                  <p>Tabs content</p>
              </div>
          </div>
      <div>
      <form>
          <p>
              <input placeholder="Text Input" type="text"></input>
          </p>
          <p>
              <input placeholder="Email Input" type="email"></input>
          </p>
              <input placeholder="Password Input" type="password"></input>
          </p>
          <p>
              <input placeholder="Number Input" type="number"></input>
          </p>
          <p>
              <input placeholder="Search Input" type="search"></input>
          </p>
          <p>
              <textarea placeholder="Textarea."></textarea>
          </p>
          <p>  
              <span class="select-arrow">
                  <select>
                      <option>An Option</option>
                      <option>An Option</option>
                      <option>An Option</option>
                      <option>An Option</option>
                  </select>
              </span>
          </p>
          <p>  
              <span class="select-arrow">
                  <select disabled="">
                      <option>An Option</option>
                      <option>An Option</option>
                      <option>An Option</option>
                      <option>An Option</option>
                  </select>
              </span>
          </p>
          <p>  
              <select size="4">
                  <option>An Option</option>
                  <option>An Option</option>
                  <option>An Option</option>
                  <option>An Option</option>
              </select>
          </p>
          <p>
              <ul class="select">
                  <li>An Option</li>
                  <li>An Option</li>
                  <li>An Option</li>
                  <li>An Option</li>
                  <li>An Option</li>
                  <li>An Option</li>
                  <li>An Option</li>
                  <li>An Option</li>
                  <li>An Option</li>
              </ul>
          </p>
          <br>
              <div class="checkboxes">
                  <p>
                      <input type="checkbox"></input>
                      <label>A Checkbox</label>
                  </p>
                  <p>
                      <input checked="checked" type="checkbox"></input>
                      <label>A Checked Checkbox</label>
                  </p>
              </div>
              <div class="radios">
                  <p>
                      <input checked="checked" name="radiogroup" type="radio"></input>
                      <label>A Checked Radio</label>
                  </p>
                  <p>
                      <input name="radiogroup" type="radio"></input>
                      <label>A Radio</label>
                  </p>
              </div>
          <input type="submit" value="Submit Input"></input>
      </form>
      <div class="example">
          <div class="simple-form-ui">
              <form id="htmlform" method="post" action="/mirebalais/emr/htmlform/enterHtmlForm/submit.action?successUrl=%2Fmirebalais%2Femr%2Fhtmlform%2FenterHtmlFormWithSimpleUi.page%3Ftiming%3DREAL_TIME%26htmlFormId%3D1%26patientId%3D15%26" onsubmit="submitHtmlForm(); return false;"><ul id="formBreadcrumb" class="options"><li class="doing"><span>Vitals</span><ul><li class="question-legend focused"><i class="icon-ok"></i><span>Height</span></li><li class="question-legend"><i class="icon-ok"></i><span>Weight</span></li><li class="question-legend"><i class="icon-ok"></i><span>(Calculated) BMI</span></li><li class="question-legend"><i class="icon-ok"></i><span>Temperature</span></li><li class="question-legend"><i class="icon-ok"></i><span>Heart Rate</span></li><li class="question-legend"><i class="icon-ok"></i><span>Respiratory Rate</span></li><li class="question-legend"><i class="icon-ok"></i><span>Blood Pressure</span></li><li class="question-legend"><i class="icon-ok"></i><span>O2 Sat</span></li></ul></li><li><span>Confirm</span></li></ul>
                  <htmlform formencountertype="4fb47712-34a6-40d2-8ed3-e153abbd25b7" formname="Vitals" formuuid="68728aa6-4985-11e2-8815-657001b58a90" formversion="1.0">
                      <section class="section focused">
                          <fieldset class="focused">
                              <h3>Height</h3>
                                  <p class="left">
                                      <span class="obs-field">
                                          <input class="number numeric-range inches focused" id="height_inches" max="89" min="4" size="5" type="text">
                                          <span class="append-to-value">in</span>
                                          <span class="error field-error" style="display: none"></span>
                                      </span>
                                  </p>
                                  <p class="left">
                                      or
                                  </p>
                              <p class="left">
                                  <span id="height_cm" class="obs-field"><input type="text" size="5" id="w10" name="w10" min="10.0" max="228.0" class="number numeric-range"><span class="append-to-value">cm</span> <span class="error field-error" style="display: none" id="w9"></span></span>
                              </p>
                          </fieldset>
                      </section>
                      <input type="button" class="submitButton" value="Enter Form" style="display: none;">
                  </htmlform>    
              <div id="confirmation">        
              </div>
              </form>
          </div>
      </div>
      <div class="example">
          <div class="visit-status">
              <span class="status active"></span> Vizit aktiv
              <i class="icon-time small"></i>
              Te kòmanse nan 06 May 2013 05:35 PM
          </div>
      </div>
      <form id="login-form">
          <fieldset>
              <legend>Login</legend>
              <p class="left">
                  <label for="username">Username:</label>
                  <input id="username" type="text" name="username" placeholder="Enter your username">
              </p>
              <p class="left">
                  <label for="password">Password:</label>
                  <input id="password" type="password" name="password" placeholder="Enter your password">
              </p>
              <p></p>
              <p>
                  <input id="login-button" class="confirm" type="submit" value="Log In">
              </p>
          </fieldset>
      </form>
    </div>
</body>
