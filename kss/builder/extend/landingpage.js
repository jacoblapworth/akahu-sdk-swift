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
	handlebars.registerPartial('card', cardPartial);

	const cardContentsPartial = `
	{{#each menu as |menuItem|}}
		{{#isEqual parentHeader @root.sections.0.header}}
			<a href="section-{{referenceURI}}.html" class="xui-u-flex ds-card xui-padding">
					<div class="xui-heading ds-card-header">{{header}}</div>
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

	const columnListPartial = `
	<div class="xui-u-flex ds-column-wrapper">
		{{#each @root.menu as |menuItem|}}
			{{#if isActive}}
				{{#each menuItem.menu}}
					<div class="ds-column">
						<a class="ds-column-item" href="section-{{referenceURI}}.html">
							{{header}}
						</a>

						{{#if menu}}
							<div class="ds-column-child-wrapper">
								{{#each menu}}
									<a class="ds-column-item ds-column-child-item" href="section-{{referenceURI}}.html">
										<div>{{header}}</div>
									</a>
								{{/each}}
							</div>
						{{/if}}
					</div>

				{{/each}}
			{{/if}}
		{{/each}}
	</div>
	`
	handlebars.registerPartial('columns', columnListPartial);

	const landingpagePartial = `
		{{#ifStyleguide "Building Blocks"}}
			{{> columns }}
		{{else}}
			{{> card }}
		{{/ifStyleguide}}
		`
	handlebars.registerPartial('landingpage', landingpagePartial);
}
