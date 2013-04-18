<%
    ui.includeCss("uicommons", "reference/reference.css")
    ui.includeCss("uicommons", "styleguide/index.css")
%>

<header id="style-guide-header">
    <h1>OpenMRS RAP Style Guide</h1>
    <h2>Customize your OpenMRS application with reusable fragments.</h2>
</header>
<div class="clear"></div>

<div id="body-wrapper" class="style-guide">
    <aside>
        <section>
            <h3>Variables</h3>
            <ul>
                <li>
                    <a href="#">Colors</a>
                </li>
                <li>
                    <a href="#">Fonts</a>
                </li>
                <li>
                    <a href="#">Icons</a>
                </li>
            </ul>
        </section>
        <section>
            <h3>Fragments</h3>
            <ul>
                <li>
                    <a href="#">Breadcrumbs</a>
                </li>
                <li>
                    <a href="#">Buttons</a>
                </li>
                <li>
                    <a href="#">Dialogs</a>
                </li>
                <li>
                    <a href="#">Notifications</a>
                </li>
                <li>
                    <a href="#">Search Box</a>
                </li>
                <li>
                    <a href="#">Tabs</a>
                </li>
                <li>
                    <a href="#">Visit status</a>
                </li>
            </ul>
        </section>
    </aside>

    <div id="content">

        <article>
            <h2>Colors</h2>
            <section>
                <p>This is OpenMRS color palette. You can alter the following variables to add you own palette.</p>
            </section>

            <section id="colors">
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
                            <span>\$var1: #30984</span>
                        </li>
                        <li>
                            <span>\$var1: #30984</span>
                        </li>
                        <li>
                            <span>\$var1: #30984</span>
                        </li>
                    </ol>
                </code>
            </section>
        </article>

        <article>
            <h2>Fonts</h2>
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
        </article>

        <article>
            <h2>Icons</h2>
            <section>
                <p>Every icon in the OpenMRS Application comes from a font called <a href="http://fortawesome.github.io/Font-Awesome/" target="blank_">Font Awesome</a>.</p>
                <p><strong>Some advantages of using a font for the icons are:</strong></p>
                <ul class="list">
                    <li>Easily style icon color, size, shadow, and anything that's possible with CSS.</li>
                    <li>Scalable vector graphics means every icon looks awesome at any size.</li>
                    <li>A font file is smaller than images.</li>
                </ul>
                <p>
                    If you need more icons, you can create your own font-family and add it in the variables. A good option for creating an icon font is <a href="http://icomoon.io/" target="blank_">IconMoon</a>.
                </p>
            </section>

            <section>
                <div class="example align-center">
                    <i class="icon-user"></i><i class="icon-user-md"></i><i class="icon-folder-open"></i><i class="icon-barcode"></i><i class="icon-cog"></i><i class="icon-home"></i><i class="icon-time"></i><i class="icon-exclamation-sign"></i><i class="icon-beaker"></i><i class="icon-heart"></i><i class="icon-search"></i><i class="icon-inbox"></i><i class="icon-remove-sign"></i><i class="icon-edit"></i>
                    <p><a href="/icons" target="blank_">Show all</a></p>
                </div>
            </section>

            <section>
                <code>
                    <ol>
                        <li>
                            <span class="comm">// Bellow is the variable for the icon font</span>
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
        </article>

        <article>
            <h2>Breadcrumbs</h2>
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
        </article>

        <article>
            <h2>Buttons</h2>
            <section>
                <p>There are <strong>4 ways</strong> to get a button style in the OpenMRS Application:</p>
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
                </code>
            </section>

            <section>
                <h3>Customized buttons</h3>
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
                    </ul>
                </div>
            </section>
        </article>

    </div>
</div>