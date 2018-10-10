<script>
  const reportABug = {
    triggerFunction: function(showCollectorDialog) {
      jQuery("#jira-bug-button").click(function(e) {
        e.preventDefault();
        showCollectorDialog();
      });
    },
    fieldValues: {
      description: "*Expected behaviour* [Attach screenshot if possible]\n-\n\n*Observed behaviour* [Attach screenshot]\n-\n\n*Steps to reproduce* [Code snippet if possible]\n-\n\n*Specifications*\n- XUI Version(s): \n- Browser(s) affected: \n- Operating system(s) affected: \n- Component(s) affected: "
    }
  };

  const requestAFeature = {
      "triggerFunction": function(showCollectorDialog) {
          jQuery("#jira-feature-button").click(function(e) {
              e.preventDefault();
              showCollectorDialog();
          });
      }, 
    fieldValues: {
          description : "*Rationale*\nHow does it improve the current implementation?\n-\n\nHow does it benefit the user?\n-\n\nHow does it assist others at Xero?\n-\n\n*Context*\nWhat product team or feature would use this?\n-\n\nAre you aware of any others with similar problems?\n-\n\n*Timeline requirements*\n[Hard or soft deadline]\n\n*Possible solution*\n[design/code]"
      }
  };

  window.ATL_JQ_PAGE_PROPS =  {
    ['df1e8803']: reportABug,
    ['83cb3f5e']: requestAFeature,
  };
</script>

<div class="ds-header--home xui-margin-bottom-5xlarge">
	<h1 class="xui-text-tight">Make things people know and love</h1>
	<p class="ds-intro intro">
		XUI is a design system for Xero web applications. It includes standard approaches and patterns plus the front-end code to implement them. XUI helps keep a large codebase healthy, allowing us to focus on user problems and get to market quickly.
	</p>
</div>

<div class="ds-tilegroup--home">
  <div class="ds-tile--home-small ds-tile--home-fundamentals">
    <a href="section-fundamentals.html">
      <h3 class="xui-heading-large">Fundamentals</h3>
			<p>Foundational pieces that make up XUI. Color, typography, icons, borders, utilities, variables, mixins and more.</p>
    </a>
  </div>
  <div class="ds-tile--home-small ds-tile--home-elements">
    <a href="section-building-blocks.html">
      <h3 class="xui-heading-large">Elements</h3>
			<p>Small pieces of UI that can be used in isolation or combination with each other. This includes form controls, identifiers and alerts.</p>
    </a>
  </div>
  <div class="ds-tile--home-small ds-tile--home-compounds">
    <a href="section-compounds.html">
      <h3 class="xui-heading-large">Compounds</h3>
			<p>Compounds combine a number of elements together, such as Content blocks, modals and accordions, to name a few.</p>
    </a>
  </div>
	<div class="ds-tile--home ds-tile--home-react">
    <a href="react/">
      <h3 class="xui-heading">React docs</h3>
			<p>Outlines specific XUI component build information for the React JS framework.</p>
    </a>
  </div>
	<div class="ds-tile--home ds-tile--home-storybook">
    <a href="storybook/">
      <h3 class="xui-heading">Storybook</h3>
			<p>Testing playground environment for XUI's React components.</p>
    </a>
  </div>
	<div class="ds-tile--home ds-tile--home-language ds-tile--home-language">
    <a href="https://github.dev.xero.com/pages/Xero/product-language-guide/">
      <h3 class="xui-heading">Language guide</h3>
			<p>Guide for understanding how we speak to people through our products.</p>
    </a>
  </div>
	<div class="ds-tile--home ds-tile--home-research ds-tile--home-research">
    <a href="https://research.xero.com/">
      <h3 class="xui-heading">Research library</h3>
			<p>Collection of research studies, where you can search through nuggets and reports.</p>
    </a>
  </div>
</div>

<div class="ds-panel--feedback xui-padding-left-5xlarge xui-padding-vertical-xlarge" id="XUIFeedback">
	<div class="xui-heading-xlarge xui-margin-bottom">Help improve our system</div>
	<div class="ds-intro intro">XUI relies on feedback from you to maintain modern web experiences. Help us by reporting any bugs or requesting features that are pivotal to your products.</div>
	<div class="xui-margin-top-2xlarge">
		<button id="jira-feature-button" class="xui-button xui-button-standard xui-margin-right">Request a feature</button>
		<button id="jira-bug-button" class="xui-button xui-button-borderless-main">Report a bug</button>
	</div>
</div>

<script type="text/javascript" src="https://jira.teamxero.com/s/bf4421b3b9298a3605255de2c4c975f7-T/kt41cb/75008/07569649877d764b4ec4d10563f6f7a3/2.0.24/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=df1e8803"></script>
<script type="text/javascript" src="https://jira.teamxero.com/s/bf4421b3b9298a3605255de2c4c975f7-T/kt41cb/75008/07569649877d764b4ec4d10563f6f7a3/2.0.24/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=83cb3f5e"></script>
