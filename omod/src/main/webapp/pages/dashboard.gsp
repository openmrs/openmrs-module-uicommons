<%
    ui.decorateWith("uicommons", "html5")

    ui.includeCss("uicommons", "styleguide/index.css")
%>


<body data-spy="scroll" data-target="#menu">
    <header>
	    <div class="logo">
	        <a href="/mirebalais">
	            <img src="http://bamboo.pih-emr.org:8080/mirebalais/ms/uiframework/resource/mirebalais/images/partners_in_health_logo.png">
	        </a>
	    </div>
	    <ul class="user-options">
	        <li class="identifier">
	            <i class="icon-user small"></i>
	            admin
	        </li>
	        <li class="change-location">
	            <a href="#">
	                <i class="icon-map-marker small"></i>
	                <span data-bind="text: text">Antepartum Ward</span>
	                <i class="icon-caret-down link"></i>
	            </a>
	        </li>
	        <li class="logout">
	            <a href="/mirebalais/logout">
	                Logout
	                <i class="icon-signout small"></i>
	            </a>
	        </li>
	    </ul>
	    <div id="session-location">
	        <div id="spinner" style="position:absolute; display:none">
	            <img src="/mirebalais/ms/uiframework/resource/uicommons/images/spinner.gif">
	        </div>
	        <ul class="select">
	            <li class="selected" locationid="2" locationname="Antepartum Ward">Antepartum Ward</li>
	        </ul>
	    </div>
	</header>
    <div class="clear"></div>
    <div class="container">
    	<div class="example">
          <ul id="breadcrumbs">
              <li>
                  <a href="#">
                  <i class="icon-home small"></i></a>
              </li>
              <li>
                  <i class="icon-chevron-right link"></i>
                  <a href="#">Patient Summary (emerson, emerson)</a>
              </li>
              <li>
              </li>
          </ul>
      </div>
	    <div class="patient-header new-patient-header">
		    <div class="demographics">
		        <h1 class="name">
		            <span>emersom,<em>surname</em></span>
		            <span>emersom<em>name</em></span>
		        </h1>
		        <div class="gender-age">
		            <span>Male</span>
		            <span>25 year(s)</span>
		        </div>
		        <br>
		        <div class="status-container">
			        <span class="status active"></span>
			        Active Visit
			    </div>
		        <div class="tag">Outpatient</div>
		    </div>
		    <div class="identifiers">
		        <em>Patient ID</em>
		        <span>Y2TWWK</span>
	            <em>Dossier Number</em>
	                 <span><a class="editPatientIdentifier" data-identifier-type-id="4" data-identifier-type-name="Dossier Number" data-patient-identifier-value="A003394" href="#4">A003394</a></span>
		    </div>
		</div>
	    <div class="dashboard clear">
	    	<div class="info-container column">
	    		<div class="info-section">
	    			<div class="info-header">
	    				<i class="icon-diagnosis"></i>
	    				<h3>DIAGNOSIS</h3>
	    			</div>
	    			<div class="info-body">
	    				<ul>
	    					<li><span class="status active"></span>Malaria <small>Lamare Johanne</small></li>
	    					<li><span class="status active"></span>Diabetes <small>Lamare Johanne</small></li>
	    					<li>Headache</li>
	    					<li>HIV complicating pregnancy</li>
	    					<li>Malignant Brain Tumour</li>
	    					<li>Leg Fracture</li>
	    					<li>Fracture of spinal vertebra</li>
	    					<li>Obsessive-Compulsive Disorder</li>
	    				</ul>
	    				<a class="view-more">Show more info ></a>
	    			</div>
	    		</div>
	    		<div class="info-section vitals">
	    			<div class="info-header">
	    				<i class="icon-vitals"></i>
	    				<h3>VITALS</h3>
	    			</div>
	    			<div class="info-body">
	    				<ul>
	    					<li><i class="icon-time"></i>Last Vitals on 16 May 2013 11:00 AM</li>
	    					<li><small>height</small> 30,5 CM</li>
	    					<li><small>weight</small> 10,5 KG</li>
	    					<li><small>temperature</small> 20.5 °C</li>
	    					<li><small>heart rate</small> 20 /MIN</li>
	    					<li><small>respiratory</small> 23  /MIN</li>
	    					<li><small>blood</small> 30 / 30</li>
	    					<li><small>o2</small> 30 %</li>
	    				</ul>
	    				<a class="view-more">Show more info ></a>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="info-container column">
	    		<div class="info-section">
	    			<div class="info-header">
	    				<i class="icon-medicine"></i>
	    				<h3>PESCRIBED MEDICATION</h3>
	    			</div>
	    			<div class="info-body">
	    				<ul>
	    					<li>Aspirin <small>500 mg every day for 2 weeks</small></li>
	    					<li>Agenerase Oral Solution <small>200 ml once a day for 1 week</small></li>
	    					<li>Tacrine (Cognex) <small>100 ml once a day for 1 week</small></li>
	    					<li>Lacrisert (Cellulose) <small>100 mg for 1 week</small></li>
	    					<li>Valsartan (Diovan) <small>300 ml once a day for 2 weeks</small></li>
	    				</ul>
	    				<a class="view-more">Show more info ></a>
	    			</div>
	    		</div>
	    		<div class="info-section">
	    			<div class="info-header">
	    				<i class="icon-medical"></i>
	    				<h3>ALLERGIES</h3>
	    			</div>
	    			<div class="info-body">
	    				<ul>
	    					<li>Shrimp <small>Hives</small></li>
	    					<li>Seafood <small>Labored Breathing</small></li>
	    					<li>Pinicilin <small>Dizziness and Vomiting</small></li>
	    				</ul>
	    			</div>
	    		</div>
	    		<div class="info-section">
	    			<div class="info-header">
	    				<i class="icon-calendar"></i>
	    				<h3>VISITS</h3>
	    			</div>
	    			<div class="info-body">
	    				<ul>
	    					<li class="clear"><a class="visit-link">18 Set 2013 - Today</a> <div class="tag">Inpatient</div></li>
	    					<li class="clear"><a class="visit-link">28 Jun 2013</a> <div class="tag">Emergency</div></li>
	    					<li class="clear"><a class="visit-link">28 May 2013</a> <div class="tag">Outpatient</div></li>
	    					<li class="clear"><a class="visit-link">8 May 2013 - 12 May 2013</a> <div class="tag">Inpatient</div></li>
	    					<li class="clear"><a class="visit-link">12 Apr 2013 - 29 Apr 2013</a> <div class="tag">Inpatient</div></li>
	    				</ul>
	    				<a class="view-more">Show more info ></a>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="action-container column">
	    		<div class="action-section">
		    		<ul>
		    			<h3>PATIENT</h3>
						<li><i class="icon-vitals"></i>Record Vitals</li>
						<li><i class="icon-stethoscope"></i>Write Consult Note</li>
						<li><i class="icon-stethoscope"></i>Write ED Note</li>
						<li><i class="icon-x-ray"></i>Order X-Ray</li>
						<li><i class="icon-tomo"></i>Order CT Scan</li>
						<li><i class="icon-paste"></i>Write Surgery Note</li>
						<h3>GENERAL</h3>
						<li><i class="icon-folder-open"></i>Request Paper Record</li>
						<li><i class="icon-print"></i>Print Card Label</li>
						<li><i class="icon-print"></i>Print Chart Label</li>
					</ul>
					<a class="button medium " href="#">
                        <i class="icon-x-ray"></i>
                        Radiology
                    </a>
                    <a class="button medium " href="#">
                        <i class="icon-paste"></i>
                        Notes
                    </a>
                    <a class="button medium " href="#">
                        <i class="icon-paper-clip"></i>
                        Surgery
                    </a>
	    		</div>
	    	</div> 
	    </div>
	</div>

</body>
