var marked = require('../../../node_modules/marked');

module.exports = function (handlebars) {
	handlebars.registerPartial('menu', `
		{{#each menu as |menuItem|}} {{! Each item is an "li" }}
			<li class="ds-nav-li ds-nav-{{depth}}">
				<a class="ds-nav-link {{#if isActive}} ds-is-active {{/if}}{{#isEqual header @root.sections.0.header}} ds-is-selected{{/isEqual}}" href="section-{{referenceURI}}.html">
					<span class="ds-nav-link--body">{{header}}</span>
				</a>
			</li>
		{{/each}}
	`);

	handlebars.registerPartial('jumpto', `
	{{#ifSections @root.sections}}
		<nav class="xui-select xui-dropdown-fixed-medium ds-page-nav">
			<select id="ds-nav-section" class="xui-select--control">
				<option value="-1" disabled selected>Jump to...</option>
				{{#each  @root.sections}} {{#ifDepth 2 }}
				<option value="{{referenceURI}}">
					{{header}}
				</option>
			{{/ifDepth}} {{/each}}
			</select>
			<svg focusable="false" class="xui-icon xui-icon-color-standard xui-select--caret"> <use xlink:href="#xui-icon-caret" role="presentation" /></svg>
		</nav>
	{{/ifSections}}
	`);

	// Returns true if there is more than 1 depth 2 block
	handlebars.registerHelper('ifSections', function(sections, options) {
		return (sections.filter(s => s.depth === 2).length > 0) ? options.fn(this) : options.inverse(this);
	});

	// Returns true if the current header is in the child config options.
	handlebars.registerHelper('hasChildren', function( options) {
		return (options.data.root.options.childPages.indexOf(this.reference) !== -1) ? options.fn(this) : options.inverse(this);
	});
}
