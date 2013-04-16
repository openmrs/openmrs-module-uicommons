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
                <p>The default OpenMRS font family is Open Sans. You can change your application fonts by altering the following variables:</p>
            </section>

            <section>
                <code>
                    <ol>
                        <li>
                            <span class="var">\$primaryFont</span>  <span>:</span>
                            <span class="val">"OpenSans"</span><span>;</span>
                        </li>
                        <li>
                            <span class="var">\$primaryBoldFont</span>  <span>:</span>
                            <span class="val">"OpenSansBold"</span><span>;</span>
                        </li>
                        <li>
                            <span class="var">\$primaryLightFont</span>  <span>:</span>
                            <span class="val">"OpenSansLight"</span><span>;</span>
                        </li>
                        <li>
                            <span class="var">\$primaryItalicFont</span>  <span>:</span>
                            <span class="val">"OpenSansItalic"</span><span>;</span>
                        </li>
                        <li>
                            <span class="var">\$iconFont</span>  <span>:</span>
                            <span class="val">"FontAwesome"</span><span>;</span>
                            <span class="comm">//This is for icons, not text.</span>
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

                </div>
            </section>
        </article>

    </div>
</div>