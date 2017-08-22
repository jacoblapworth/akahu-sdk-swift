module.exports = function (handlebars) {
	const menuPartial = `
			{{#each menu}} {{! Each item is an "li" }}
			<li class="ds-nav-li ds-nav-{{menuDepth}}">
				<a class="ds-nav-link {{#if isActive}} ds-is-active {{/if}}{{#isEqual header @root.sections.0.header}} ds-is-selected{{/isEqual}}" href="section-{{referenceURI}}.html">
					<span>{{header}}</span>
				</a>
				{{#if isActive}}
				<ul>
				{{> menu}} {{! Recursively render the partial }}
				</ul>
				{{/if}}
		</li>
		{{/each}}
	`;

	const sectionMenuPartial = `
		<nav class="ds-section-part">
			<ul id="ds-nav-section" class="ds-nav ds-nav-section xui-picklist xui-picklist-layout">
				{{#each children}} {{#ifDepth 2}}
				<li>
					<a class="xui-pickitem" href="section-{{../referenceURI}}.html#{{referenceURI}}">
						<span class="xui-pickitem--body">{{header}}</span>
					</a>
				</li>
				{{/ifDepth}} {{/each}}
			</ul>
		</nav>
		`;

	handlebars.registerPartial('menu', menuPartial);
	handlebars.registerPartial('sectionMenu', sectionMenuPartial);
}
