<%
    ui.decorateWith("uicommons", "html5")

    ui.includeCss("uicommons", "styleguide/index.css")
    ui.includeCss("uicommons", "styleguide/jquery.toastmessage.css")
    ui.includeCss("uicommons", "styleguide/jquery-ui-1.9.2.custom.min.css")

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
                <li><a class="active" href="${ui.pageLink("uicommons", "styleGuide")}">Base Style</a></li>
                <li><a href="${ui.pageLink("uicommons", "javascript")}">Javascript</a></li>
                <li><a href="${ui.pageLink("uicommons", "testPage")}">Test Pages</a></li>
            </ul>
        </nav>
    </header>
    <div class="clear"></div>

    <div id="body-wrapper" class="style-guide">
        <aside id="menu-container">
            <section id="menu" >
                <h3>Variables</h3>
                <ul id="menu-list" class="nav">
                    <li>
                        <a href="#colors">Colors</a>
                    </li>
                    <li>
                        <a href="#fonts">Fonts</a>
                    </li>
                    <li>
                        <a href="#icons">Icons</a>
                    </li>
                     <li>
                        <a href="#override">How to Override</a>
                    </li>
                </ul>
            
                <h3>Fragments</h3>
                <ul id="menu-list" class="nav">
                    <li>
                        <a href="#navigation">Navigation</a>
                    </li>
                    <li>
                        <a href="#buttons">Buttons</a>
                    </li>
                    <li>
                        <a href="#buttongroups">Button Groups</a>
                    </li>
                    <li>
                        <a href="#dialogs">Dialogs</a>
                    </li>
                    <li>
                        <a href="#notifications">Notifications</a>
                    </li>
                    <li>
                        <a href="#toast">Toast Messages</a>
                    </li>
                    <li>
                        <a href="#search-box">Search Box</a>
                    </li>
                    <li>
                        <a href="#tabs">Tabs</a>
                    </li>
                    <li>
                        <a href="#form">Forms</a>
                    </li>
                    <li>
                        <a href="#tables">Tables</a>
                    </li>
                    <li>
                        <a href="#status-container">Status Container</a>
                    </li>
                    <li>
                        <a href="#usage">Usage Examples</a>
                    </li>
                </ul>
            </section>
        </aside>
        <div id="content">
            <article id ="colors">
                <h1>Colors</h1>
                <section>
                    <p>This is OpenMRS color palette. You can alter the following variables to add you own palette.</p>
                </section>

                <section id="colors-example">
                    <h3>OpenMRS Colors</h3>
                    <ul>
                        <li>
                            <span style="background-color: #F26522"></span>
                            <p>#F26522</p>
                        </li>
                        <li>
                            <span style="background-color: #5B57A6"></span>
                            <p>#5B57A6"</p>
                        </li>
                        <li>
                            <span style="background-color: #EEA616"></span>
                            <p>#EEA616</p>
                        </li>
                        <li>
                            <span style="background-color: #009384"></span>
                            <p>#009384</p>
                        </li>
                        <li>
                            <span style="background-color: #231F20"></span>
                            <p>#231F20</p>
                        </li>
                    </ul>
                </section>
                <section>
                    <code>
                        <ol>
                            <li>
                                <span>\$highlight: #30984</span>
                            </li>
                            <li>
                                <span>\$text: #30984</span>
                            </li>
                        </ol>
                    </code><br>
                </section>
            </article>
            <article id="fonts">
                <h1>Fonts</h1>
                <section>
                    <p>The default OpenMRS font family is <a href="http://www.google.com/fonts/specimen/Open+Sans" target="blank_"> Open Sans</a>. You can change your application fonts by altering the following variables.</p>
                    <p class="caution"><i class="icon-exclamation-sign small"></i>Deleting a variable may cause the application to crash.</p>
                </section>
                <section>
                    <code>
                        <ol>
                            <li>
                                <span class="var">\$primaryFont</span><span>:</span>
                                <span class="val">"OpenSans"</span><span>;</span>
                            </li>
                            <li>
                                <span class="var">\$primaryBoldFont</span><span>:</span>
                                <span class="val">"OpenSansBold"</span><span>;</span>
                            </li>
                            <li>
                                <span class="var">\$primaryLightFont</span><span>:</span>
                                <span class="val">"OpenSansLight"</span><span>;</span>
                            </li>
                            <li>
                                <span class="var">\$primaryItalicFont</span><span>:</span>
                                <span class="val">"OpenSansItalic"</span><span>;</span>
                            </li>
                        </ol>
                    </code>
                </section>
                <section id="typography">
                    <h1>Typography</h1>
                    <div class="headers">
                        <h1>Header 1</h1>
                        <h2>Header 2</h2>
                        <h3>Header 3</h3>
                        <h4>Header 4</h4>
                        <h5>Header 5</h5>
                        <h6>Header 6</h6>
                    </div>
                    <div class="sizes">
                        <h3 class="title">Title font weight</h3>
                        <h3 class="body">Body font weight</h3>
                        <h3 class="small">Small font weight</h3>
                    </div>
                    <p>Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph</p>
                    <em>Emphasized text Emphasized text Emphasized text </em><br>
                    <strong>Strong text Strong text Strong text Strong text </strong><br>
                    <small>Small text Small text Small text Small text Small </small>
                </section>
            </article>
            <article id="icons">
                <h1>Icons</h1>
                <section>
                    <p>Every icon in the OpenMRS Application comes from a font called <a href="http://fortawesome.github.io/Font-Awesome/" target="blank_">Font Awesome</a>.</p><br>
                    <p><strong>Some advantages of using a font for the icons are:</strong></p>
                    <ul class="list">
                        <li>Easily style icon color, size, shadow, and anything that's possible with CSS.</li>
                        <li>Scalable vector graphics means every icon looks awesome at any size.</li>
                        <li>A font file is smaller than images.</li>
                    </ul>
                    <br>
                    <p>
                        If you need more icons, you can create your own font-family and add it in the variables. A good option for creating an icon font is <a href="http://icomoon.io/" target="blank_">IconMoon</a>.
                    </p>
                </section>
                <section>
                    <div class="example align-center">
                        <i class="icon-user"></i><i class="icon-user-md"></i><i class="icon-folder-open"></i><i class="icon-barcode"></i><i class="icon-cog"></i><i class="icon-home"></i><i class="icon-time"></i><i class="icon-exclamation-sign"></i><i class="icon-beaker"></i><i class="icon-heart"></i><i class="icon-search"></i><i class="icon-inbox"></i><i class="icon-remove-sign"></i><i class="icon-edit"></i>
                        <p><a href="${ui.pageLink("uicommons", "icons")}" target="blank_">Show all</a></p>
                    </div>
                </section>
                <section>
                    <code>
                        <ol>
                            <li>
                                <span class="comm">// Below is the variable for the icon font</span>
                            </li>
                            <li>
                                <span class="comm">// It is located in reference/_variable.scss.</span>
                            </li>
                            <li>
                                <span class="var">\$iconFont</span><span>:</span>
                                <span class="val">"FontAwesome"</span><span>;</span>
                            </li>
                            <li></li>
                            <li>
                                <span class="comm">// This is how you insert an icon:</span>
                            </li>
                            <li>
                                <span>&lt;a&nbsp;</span><span class="var">class=</span><span class="val">&quot;button&quot;</span><span class="var">&nbsp;href=<span class="val">&quot;#&quot;</span><span>&gt;</span>
                            </li>
                            <li>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;i&nbsp;</span><span class="var">class=</span><span class="val">&quot;icon-home&quot;</span><span>&gt;&lt;/i&gt;</span>
                            </li>
                        </li>
                            <li>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Button&nbsp;with&nbsp;a&nbsp;home&nbsp;icon</span>
                            </li>
                            <li>
                                <span>&lt;/a&gt;</span>
                            </li>
                        </ol>
                    </code>
                </section>
                <section>
                    <p>Here are the icons that you should use for specific purposes, for consistency across the reference
                    application</p>
                    <table>
                        <thead>
                        <tr>
                            <th>Usage</th>
                            <th>Icon</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <i class="small icon-pencil"></i>
                                <strong>Edit</strong>
                                <br/>
                                Modifying an existing piece of data
                            </td>
                            <td>
                                icon-pencil
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i class="small icon-plus"></i>
                                <strong>Add</strong>
                                <br/>
                                Add a new piece of data (e.g. to a list)
                            </td>
                            <td>
                                icon-plus
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i class="small icon-remove"></i>
                                <strong>Delete / Remove</strong>
                                <br/>
                                Delete an item or remove it from a list
                            </td>
                            <td>
                                icon-remove
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i class="small icon-signin"></i>
                                <strong>Admission</strong>
                                <br/>
                                Patient is admitted to inpatient care
                            </td>
                            <td>
                                icon-signin
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i class="small icon-random"></i>
                                <strong>Transfer</strong>
                                <br/>
                                Patient is transferred between two locations in the facility
                            </td>
                            <td>
                                icon-random
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i class="small icon-signout"></i>
                                <strong>Exit / Discharge</strong>
                                <br/>
                                Patient is discharged from inpatient care (may be okay to use for exits for reasons other than discharge)
                            </td>
                            <td>
                                icon-signout
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i class="small icon-vitals"></i>
                                <strong>Vital Signs</strong>
                                <br/>
                                Referring to or capturing a patient's vital signs
                            </td>
                            <td>
                                icon-vitals
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i class="small icon-stethoscope"></i>
                                <strong>Clinical encounter with provider</strong>
                                <br/>
                                Referring to or capturing encounters where providers record clinical data about the patient
                                (e.g. writing visit notes, or consultation notes)
                            </td>
                            <td>
                                icon-stethoscope
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </article>
            <article id ="override">
                <h1>How to override variables in your project</h1>
                <section>
                    <p>In order to override variables you need to add the file customVariables.scss to your project.</p>
                    <p>The first thing you need to do is import the variables.scss file from RAP sass framework. After that you can start overwriting the variables you want.</p>
                    <h3>customVariables.scss</h3>
                    <code>
                        <ol>
                            <li>
                                <span class="var">@import</span>
                                <span class="val">"variables"</span><span>;</span>
                            </li>
                            <li></li>
                            <li>
                                <span>//override variables</span>
                            </li>
                            <li>
                                <span class="var">\$text</span><span>:</span>
                                <span class="val">#003F5E</span><span>;</span>
                            </li>
                            <li>
                                <span class="var">\$highlight</span><span>:</span>
                                <span class="val">#501D3D</span><span>;</span>
                            </li>
                        </ol>
                    </code><br>
                    <p>The next thing to do is to import customVariables.scss to your sass and after that import the RAP sass framework.</p>
                    <h3>yourProject.scss</h3>
                    <code>
                        <ol>
                            <li>
                                <span class="var">@import</span>
                                <span class="val">"customVariables"</span><span>;</span>
                            </li>
                            <li>
                                <span class="var">@import</span>
                                <span class="val">"reference"</span><span>;</span>
                            </li>
                        </ol>
                    </code>
                </section>
            </article>
            <article id="navigation">
                <h1>Navigation</h1>
                <section>
                    <p>Every page should have breadcrumbs to indicate where the user is located and the steps he/she did to get there.</p>
                </section>

                <section>
                    <div class="example">
                        <ul id="breadcrumbs">
                            <li>
                                <a href="#">
                                <i class="icon-home small"></i></a>
                            </li>
                            <li>
                                <i class="icon-chevron-right link"></i>
                                <a href="#">Arsand, Natalia</a>
                            </li>
                            <li>
                                <i class="icon-chevron-right link"></i>Visits
                            </li>
                        </ul>
                    </div>
                </section>
                <section>
                    <div class="example">
                        <ul id="left-menu" class="left-menu">
                            <li class="menu-item selected" visitid="54">
                                <span class="menu-date">
                                    <i class="icon-time"></i>
                                    20 May 2013 (active since 04:10 PM)
                                </span>
                                <span class="menu-title">
                                    <i class="icon-stethoscope"></i>
                                        No diagnosis yet.
                                </span>
                                <span class="arrow-border"></span>
                                <span class="arrow"></span>
                            </li>
                        
                            <li class="menu-item" visitid="53">
                                <span class="menu-date">
                                    <i class="icon-time"></i>
                                    15 May 2013 - 15 May 2013
                                </span>
                                <span class="menu-title">
                                    <i class="icon-stethoscope"></i>
                                        No diagnosis yet.
                                </span>
                                <span class="arrow-border"></span>
                                <span class="arrow"></span>
                            </li>
                        
                            <li class="menu-item" visitid="19">
                                <span class="menu-date">
                                    <i class="icon-time"></i>
                                    25 Feb 2013 - 25 Feb 2013
                                </span>
                                <span class="menu-title">
                                    <i class="icon-stethoscope"></i>
                                        No diagnosis yet.
                                </span>
                                <span class="arrow-border"></span>
                                <span class="arrow"></span>
                            </li>
                    </ul>
                    </div>
                </section>
            </article>
            <article id="buttons">
                <h1>Buttons</h1>
                <section>
                    <p>There are <strong>4 ways</strong> to get a button style in the OpenMRS Application:</p>
                    <ul class="list">
                        <li>By a class;</li>
                        <li>By a submit input;</li>
                        <li>By a button input;</li>
                        <li>By a button tag.</li>
                    </ul>
                </section>
                <section>
                    <code>
                        <ol>
                            <li>
                                <span class="comm">// By a class:</span>
                            </li>
                            <li>
                                <span>&lt;a&nbsp;</span><span class="var">class=</span><span class="val">&quot;<strong>button</strong>&quot;&nbsp;</span><span class="var">href=</span><span class="val">&quot;#&quot;</span><span>&gt;</span>
                            </li>
                            <li>
                                <span>&nbsp;&nbsp;&nbsp;This is a button</span>
                            </li>
                            <li>
                                <span>&lt;/a&gt;</span>
                            </li>
                            <li></li>
                            <li>
                                <span class="comm">// By a submit input:</span>
                            </li>
                            <li>
                                <span>&lt;<strong>input</strong></span>
                                <span class="var">type=</span><span class="val">"<strong>submit</strong>"</span><span class="var"> value=</span><span class="val">"Submit Button"</span><span> /&gt;</span>
                            </li>
                            <li></li>
                            <li>
                                <span class="comm">// By a button input:</span>
                            </li>
                            <li>
                                <span>&lt;<strong>input</strong></span>
                                <span class="var">type=</span><span class="val">"<strong>button</strong>"</span><span class="var"> value=</span><span class="val">"Input Button"</span><span> /&gt;</span>
                            </li>
                            <li></li>
                            <li>
                                <span class="comm">// By a button tag:</span>
                            </li>
                            <li>
                                <span>&lt;<strong>button</strong>&gt;</span>
                            </li>
                            <li>
                                <span>&nbsp;&nbsp;&nbsp;This is a button</span>
                            </li>
                            <li>
                                <span>&lt;/<strong>button</strong>&gt;</span>
                            </li>
                            <li></li>
                        </ol>
                    </code><br>
                </section>
                <section>
                    <h2>Customized buttons</h2>
                    <p>Customized buttons are additional classes you can use to indicate types of buttons in the interface:</p>
                    <ul class="list">
                        <li>For actions: <strong>.confirm</strong>, <strong>.cancel</strong></li>
                        <li>
                            For icon sizes: <strong>.big</strong>, <strong>.medium</strong>
                            <ul>
                                <li>This will affect the <em>icon</em> size, not the button itself, but should be applied to the button level.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>.disabled</strong>
                            <ul>
                                <li>Use it when a button in in an inactive mode, for example if the user needs to fill in an input to proceed.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>.app</strong>
                            <ul>
                                <li>To create the apps buttons, all sized the same. Must come together with the <em>.big</em> class.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>.task</strong>
                            <ul>
                                <li>For task buttons such as "Record Vitals". Usually used in the Patient Dashboard.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>.arrow</strong>
                            <ul>
                                <li>For action buttons that needs a sense of direction. Usually used in the Archives room.</li>
                            </ul>
                        </li>
                    </ul>
                </section>
                <section>
                    <div class="example">
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
                            <li>
                                <div class="dropdown">
                                    <span class="dropdown-name">
                                        <i class="icon-cog"></i>
                                        Actions
                                        <i class="icon-sort-down"></i>
                                    </span>
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i class="icon-heart"></i>
                                                Save
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="icon-edit"></i>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="icon-check-in"></i>
                                                Create
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="icon-remove"></i>
                                                Delete
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="icon-ok"></i>
                                                Add
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </article>
            <article id="buttongroups">
                <h1>Button Groups</h1>
                <section>
                    <p>
                        Button groups can achieve the same purpose as radio buttons or checkboxes, but they are often
                        user-friendlier in interfaces intended to be managed by touch or mouse (but not keyboard).
                    </p>
                    <p>
                        The visual effect comes from marking one button with the "active" class. The actual behavior
                        requires JavaScript, and works with AngularJS and ui-bootstrap.
                    </p>
                </section>
                <section>
                    <code>
                        <ol>
                            <li>
                                <span>&lt;div class="button-group"&gt;</span>
                            </li>
                            <li>
                                <span>&nbsp;&nbsp;&nbsp;&lt;label class="button" ng-model="propertyToSet" btn-radio="valueToSetItTo"&gt; Display &lt;/label&gt;</span>
                            </li>
                            <li>
                                <span>&nbsp;&nbsp;&nbsp;&lt;label class="button" ng-model="propertyToSet" btn-radio="anotherValueToSetItTo"&gt; Another &lt;/label&gt;</span>
                            </li>
                            <li>
                                <span>&lt;/div&gt;</span>
                            </li>
                        </ol>
                    </code>
                </section>
                <section>
                    <div class="example">
                        <div class="button-group">
                            <label class="button active"> One </label>
                            <label class="button"> Two </label>
                            <label class="button"> Three </label>
                        </div>
                    </div>
                </section>
            </article>
            <article id="dialogs">
                <h1>Dialogs</h1>
                <section>
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
                </section>
            </article>
            <article id="notifications">
                <h1>Notifications</h1>
                <section>
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
                </section>
            </article>
            <article id="toast">
                <h1>Toast Messages</h1>
                <section>
                    <p>
                        <a href="http://akquinet.github.io/jquery-toastmessage-plugin/">Jquery Toastmessage</a>
                    </p>
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
                </section>
            </article>
            <article id="search-box">
                <h1>Search Box</h1>
                <section>
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
                </section>
            </article>
            <article id="tabs">
                <h1>Tabs</h1>
                <section>
                    <p>
                        <a href="http://jqueryui.com/">Jquery UI</a>
                    </p>
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
                </section>
            </article>
            <article id="form">
                <h1>Forms</h1>
                <section>
                    <p>                        
                        <h3>Guidelines</h3>
                        <ul class="list">
                            <li>Use top-aligned labels for input fields.</li>
                            <li>Use (required) after a label for required fields if the majority of the fields are optional.</li>
                            <li>Use (optional) after a label for optional fields if the majority of the fields are required.</li>
                            <li>If all your fields are either mandatory or optional, don't mark any.</li>
                            <li>Length of input fields should communicate the intended content.</li>
                            <li>Fields don't need to all be the same length. Mix long and short field length according to the content it is used for.</li>
                        </ul>
                        <h3>Validation</h3>
                         <ul class="list">   
                            <li>Use double visual emphasys for errors - Example: error message + red background in input.</li>
                            <li>Use descriptive error messages bellow the input fields.</li>
                            <li>if form is too long provide a summary of the errors on the top of the form.</li>

                        </ul>
                        <h3>Validation Short Forms</h3>
                        <span>For short form validation use double visual emphasis on the input.</span>
                        <div class="example">
                            <form class="simple-form-ui">
                                <p>
                                    <label for="validation-input">Input Validation</label>
                                    <input class="illegalValue" type="text" id="validation-input"></input>
                                    <span class="error field-error">Input is required</span>
                                </p>
                            </form>
                        </div>
                       
                        <h3>Validation Long Forms</h3>
                        <span>For long form validation use double visual emphasis on the input and also provide a summary error message on the top.</span>
                        <div class="example">
                            <form class="simple-form-ui">
                                <div id="error-message" class="note-container">
                                <div class="note error">
                                    <div class="text">
                                        <i class="icon-remove medium"></i>
                                        
                                            <p>First Name is required<br>Surname is required<br>Provider Type is required<br></p>
                                        
                                    </div>
                                    <div class="close-icon"><i class="icon-remove"></i></div>
                                </div>
                            </div>
                                <p>
                                    <label for="validation-input2">Input Validation</label>
                                    <input class="illegalValue" type="text" id="validation-input2"></input>
                                    <span class="error field-error">Input is required</span>
                                </p>
                            </form>
                        </div>
                    </p>
                </section>
                <section>
                    <h3>Code</h3>
                    <blockquote>
                        Everything inside tag &lt;form&gt; is auto styled to follow this styleguide rules.<br>
                        The html structure is basically this:
                        <code>&lt;form&gt;<br>
                            &nbsp; &lt;fieldset&gt;<br>
                             &nbsp;  &nbsp; &lt;legend&gt;<br>
                              &nbsp;  &nbsp;  &nbsp; &lt;i class="icon-class-if-needed"&gt;&lt;/i&gt;<br>
                               &nbsp;  &nbsp;  &nbsp; Fieldset title if needed<br>
                               &nbsp;  &nbsp; &lt;/legend&gt;<br>
                                &nbsp;  &nbsp; &lt;p class="input-position-class"&gt;<br>
                                &nbsp;  &nbsp;  &nbsp; &lt;label name="input-id"&gt;Input label&lt;/label&gt;<br>
                                 &nbsp;  &nbsp;  &nbsp; &lt;input id="input-id"/&gt;<br>
                                &nbsp;  &nbsp; &lt;/p&gt;<br>
                                 &nbsp; &lt;/fieldset&gt;<br>
                                 &lt;/form&gt;</code>

                        <h4>Obs.:</h4>
                        <ol>
                            <li>Always group a &lt;label&gt; and its &lt;input&gt; inside a &lt;p/&gt; tag;</li>
                            <li>Always link the &lt;label&gt; name to its &lt;input&gt; id;</li>
                            <li>Add class "left" for each &lt;p/&gt; tag if side-by-side inputs are needed;</li>
                            <li>&lt;legend&gt; tag is only necessary if a fieldset title is needed; </li>
                        </ol>
                    </blockquote>
                </section>
                <section>
                    <h2>Form Elements</h2>
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
                            <textarea placeholder="Text Area"></textarea>
                        </p>
                        <p>
                            <input id="typeahead" data-provide="typeahead" placeholder="Auto Suggest" type="text"></input>
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
                        ${ ui.includeFragment("uicommons", "field/datetimepicker", [ id: 'datetime', label: 'Date Picker', formFieldName: 'date picker', useTime: false ]) }
                        ${ ui.includeFragment("uicommons", "field/datetimepicker", [ id: 'datetime2', label: 'Date Time Picker', formFieldName: 'date time picker', useTime: true ]) }
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
                </sectiom>
                <section>
                    <h2>Form Entry UI</h2>
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
                </section>
            </article>
            <article id="tables">
                <h1>
                  Tables
                </h1>
                <section>
                    <p>
                        Tables in the application are automatically styled with zebra-striping. Make sure you use
                        &lt;thead&gt; and &lt;tbody&gt; sections around your rows.
                    </p>
                    <p>
                        If each of a table rows have multiple possible actions associated with them, use an
                        "Actions" column with icons for those actions. You should describe the action with a tooltip
                        via the title attribute, rather than repeating words in every row of the table.
                    </p>
                    <table>
                        <thead>
                        <tr>
                            <th>Table Header</th>
                            <th>Table Header</th>
                            <th>Table Header</th>
                            <th>Table Header</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Table Data</td>
                            <td>Table Data</td>
                            <td>Table Data</td>
                            <td>Table Data</td>
                            <td>
                                <i class="icon-pencil edit-action" title="Edit"></i>
                                <i class="icon-remove delete-action" title="Delete"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>Table Data</td>
                            <td>Table Data</td>
                            <td>Table Data</td>
                            <td>Table Data</td>
                            <td>
                                <i class="icon-pencil edit-action" title="Edit"></i>
                                <i class="icon-remove delete-action" title="Delete"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>Table Data</td>
                            <td>Table Data</td>
                            <td>Table Data</td>
                            <td>Table Data</td>
                            <td>
                                <i class="icon-pencil edit-action" title="Edit"></i>
                                <i class="icon-remove delete-action" title="Delete"></i>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </article>
            <article id="status-container">
                <h1>Status Container</h1>
                <section>
                    <div class="example">
                        <div class="status-container">
                            <span class="status active"></span> Vizit aktiv
                            <i class="icon-time small"></i>
                            Te kòmanse nan 06 May 2013 05:35 PM
                        </div>
                    </div>
                </section>
                <h1>Date Format Guidelines</h1>
                <section>
                    <p>There is two kinds of data formats for two different scenarios. One is specific for viewing date information and the other one is for editing a date on an input.
                    <h3>Viewing date</h3>
                    <p>6 May 2013 05:35 PM</P>
                    <h3>Editing date</h3>
                    <p>06-05-2013 17:35</P>
                </section>
            </article>
            <article id="usage">
                <h1>Usage Examples</h1>
                <section>
                    <h2>Login Page</h2>
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
                </section>
            </article>
        </div>
    </div>
</body>
