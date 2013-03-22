<script type="text/javascript">

    var sessionLocationModel = {
        id: ko.observable(),
        text: ko.observable()
    };

    jq(function() {
        jq(".change-location a").click(function() {
            jq('#session-location').show();
            jq(this).addClass('focus');
            jq(".change-location a i:nth-child(3)").removeClass("icon-caret-down");
            jq(".change-location a i:nth-child(3)").addClass("icon-caret-up");
        });

        jq('#session-location').mouseleave(function() {
            jq('#session-location').hide();
            jq(".change-location a").removeClass('focus');
            jq(".change-location a i:nth-child(3)").addClass("icon-caret-down");
            jq(".change-location a i:nth-child(3)").removeClass("icon-caret-up");
        });

        ko.applyBindings( sessionLocationModel, jq('.change-location').get(0) );
        sessionLocationModel.id(${ emrContext.sessionLocation?.id });
        sessionLocationModel.text("${ ui.format(emrContext.sessionLocation) }");

        // This part might need to be thrown out.

        jq("#session-location ul.select li").click(function(event) {
            var element = jq(event.target);
            var locationId = element.attr("locationId");
            var locationName = element.attr("locationName");

            var data = "locationId=" + locationId;

            jq("#spinner").show();

            jq.post("/${ contextPath }/mirebalais/standard.page", data, function(returnedData) {
                sessionLocationModel.id(locationId);
                sessionLocationModel.text(locationName);
                jq('#session-location li').removeClass('selected');
                element.addClass('selected');
                jq("#spinner").hide();
            })

            jq('#session-location').hide();
            jq(".change-location a").removeClass('focus');
            jq(".change-location a i:nth-child(3)").addClass("icon-caret-down");
            jq(".change-location a i:nth-child(3)").removeClass("icon-caret-up");
        });
    });

</script>

<header>
    <div class="logo">
        <a href="${ ui.pageLink("mirebalais", "home") }">
            <img src="${ ui.resourceLink("mirebalais", "images/partners_in_health_logo.png") }"/>
        </a>
    </div>
    <% if (context.authenticated) { %>
    <ul class="user-options">
        <li class="identifier">
            <i class="icon-user small"></i>
            ${ context.authenticatedUser.username ?: context.authenticatedUser.systemId }
        </li>
        <li class="change-location">
            <a href="#">
                <i class="icon-map-marker small"></i>
                <span data-bind="text: text"></span>
                <i class="icon-caret-down link"></i>
            </a>
        </li>
        <li class="logout">
            <a href="/${ contextPath }/logout">
                ${ ui.message("emr.logout") }
                <i class="icon-signout small"></i>
            </a>
        </li>
    </ul>
    <div id="session-location">
        <div id="spinner" style="position:absolute; display:none">
            <img src="${ui.resourceLink("mirebalais", "images/spinner.gif")}">
        </div>
        <ul class="select">
            <% emrProperties.allAvailableLocations.sort { ui.format(it) }.each {
                def selected = (it==emrContext.sessionLocation) ? "selected" : ""
            %>
            <li class="${selected}" locationId="${it.id}" locationName="${ui.format(it)}">${ui.format(it)}</li>
            <% } %>
        </ul>
    </div>
    <% } %>
</header>