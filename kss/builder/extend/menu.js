var marked = require('../../../node_modules/marked');

module.exports = function (handlebars) {
	const menuPartial = `
			{{#each menu as |menuItem|}} {{! Each item is an "li" }}
			<li class="ds-nav-li ds-nav-{{menuDepth}}">
				<a class="ds-nav-link {{#if isActive}} ds-is-active {{/if}}{{#isEqual header @root.sections.0.header}} ds-is-selected{{/isEqual}}" href="section-{{referenceURI}}.html">
					<span>{{header}}</span>
					{{#if menuItem.menu}}
						<svg focusable="false" class="xui-icon xui-icon-inline xui-text-color-faint {{#unless isActive}}xui-u-rotate-270{{/unless}} ds-nav-icon">
							<use xlink:href="#xui-icon-arrow" role="presentation"/>
						</svg>
					{{/if}}
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
