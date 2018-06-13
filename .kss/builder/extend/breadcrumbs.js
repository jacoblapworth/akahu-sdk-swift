module.exports = function (handlebars) {
	handlebars.registerPartial('breadcrumbContent', `
		{{#if isActive}}
			{{#if parentHeader}}
				<li class="ds-step xui-step xui-step-layout xui-step-is-complete">
					<a class="ds-step--body xui-step--body" href="section-{{parentReferenceURI}}.html">
						<span class="">{{parentHeader}}</span>
						<svg focusable="false" class="ds-step--icon xui-step--icon xui-icon xui-blobicon xui-u-rotate-270"><use xlink:href="#xui-icon-arrow-small" role="presentation" /></svg>
					</a>
				</li>
			{{/if}}
			{{#each menu }} {{! Each item is an "li" }}
				{{> breadcrumbContent}}
			{{/each}}
		{{/if}}`
	);

	handlebars.registerPartial('breadcrumbs', `
		<nav>
			<ul class="ds-steps xui-steps xui-steps-interactive xui-u-flex-justify-left">
				<li class="ds-step xui-step xui-step-layout xui-step-is-complete">
					<a class="ds-step--body xui-step--body" href="index.html">XUI</a>
				</li>
				{{#each menu}}
					{{> breadcrumbContent }}
				{{/each}}
			</ul>
		</nav>`
	);

}
