module.exports = function (handlebars) {
	const cardPartial = `
		<div class="xui-u-flex ds-card-wrapper">
			{{#each @root.menu}}
				{{#if isActive}}
						{{> cardContents }}
				{{/if}}
			{{/each}}
		</div>
	`

	const cardContentsPartial = `
	{{#each menu as |menuItem|}}

		{{#isEqual parentHeader pageReference}}
			<a href="section-{{referenceURI}}.html" class="xui-u-flex ds-card xui-padding">
					<div class="xui-heading-small ds-card-header">{{header}}</div>
					<div class="xui-text-secondary ds-card-content">{{{teaser}}}</div>
			</a>
		{{/isEqual}}

		{{#if menuItem.menu}}
			{{#if isActive}}
				{{> cardContents}}
			{{/if}}
		{{/if}}

	{{/each}}
	`

	handlebars.registerPartial('cardContents', cardContentsPartial);
	handlebars.registerPartial('card', cardPartial);
}
