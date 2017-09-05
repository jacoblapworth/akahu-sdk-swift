module.exports = function (handlebars) {
	const breadcrumbPartial = `
		{{#ifNotInMenu sections.0.header menu}}
	    <nav>
	      <ul class="ds-steps xui-steps xui-steps-interactive xui-u-flex-justify-left">
				<li class="ds-step xui-step xui-step-layout xui-step-is-complete">
					<a class="ds-step--body xui-step--body" href="index.html">XUI</a>
					<svg focusable="false" class="ds-step--icon xui-step--icon xui-icon xui-u-rotate-270"><use xlink:href="#xui-icon-arrow-small" role="presentation" /></svg>
				</li>
				{{#each @root.menu}}
					{{#if isActive}}
						{{> breadcrumbContent}}
					{{/if}}
				{{/each}}

				</ol>
			</nav>
		{{/ifNotInMenu}}
	`

	const breadcrumbContentsPartial = `
	{{#isNotEqual header pageReference}}
		<li class="ds-step xui-step xui-step-layout xui-step-is-complete xui-u-flex-justify-left">
			<a class="ds-step--body xui-step--body" href="section-{{referenceURI}}.html">{{header}}</a>
			{{#if menu}}
				{{#ifNotInMenu pageReference menu}}
						<svg focusable="false" class="ds-step--icon xui-step--icon xui-icon xui-u-rotate-270"><use xlink:href="#xui-icon-arrow-small" role="presentation" /></svg>
				{{/ifNotInMenu}}
			{{/if}}
		</li>
	{{/isNotEqual}}

		{{#each menu as |childItem|}}
			{{#if childItem.isActive}}
				{{> breadcrumbContent}}
			{{/if}}
		{{/each}}

	`

	handlebars.registerPartial('breadcrumbContent', breadcrumbContentsPartial);
	handlebars.registerPartial('breadcrumbs', breadcrumbPartial);
}
