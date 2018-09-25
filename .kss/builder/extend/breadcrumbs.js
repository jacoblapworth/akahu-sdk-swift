module.exports = function (handlebars) {
	handlebars.registerPartial('breadcrumbContent', `
		{{#if isActive}}
			{{#if parentHeader}}
				<li class="ds-step ds-step ds-step-layout ds-step-is-complete">
					<a class="ds-step--body ds-step--body" href="section-{{parentReferenceURI}}.html">
						<span class="">{{parentHeader}}</span>
						<div class="ds-step--icon ds-step--icon xui-iconwrapper">
							<svg focusable="false" class="xui-icon xui-icon-rotate-270"><use xlink:href="#xui-icon-arrow-small" role="presentation" /></svg>
						</div>
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
			<ul class="ds-steps ds-steps ds-steps-interactive xui-u-flex-justify-start">
				<li class="ds-step ds-step ds-step-layout ds-step-is-complete">
					<a class="ds-step--body ds-step--body" href="index.html">XUI</a>
				</li>
				{{#each menu}}
					{{> breadcrumbContent }}
				{{/each}}
			</ul>
		</nav>`
	);

}
