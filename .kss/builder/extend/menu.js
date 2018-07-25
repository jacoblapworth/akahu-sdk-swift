var marked = require('../../../node_modules/marked');

module.exports = function (handlebars) {
	handlebars.registerPartial('menu', `
		{{#each menu as |menuItem|}} {{! Each item is an "li" }}
			<li>
				<input id="ds-input-{{referenceURI}}" type="checkbox" class="ds-nav--item-state" {{#if isActive}}{{#isNotEqual header @root.sections.0.header}}checked{{/isNotEqual}} {{/if}}/>
				<div class="ds-nav--item">
					<a class="ds-nav--item--index {{#if isActive}} ds-is-active {{/if}}{{#isEqual header @root.sections.0.header}} ds-nav--item-is-selected{{/isEqual}}" href="section-{{referenceURI}}.html">
						<span>{{header}}</span>
					</a>
					{{#if menu}}
						<label for="ds-input-{{referenceURI}}" class="ds-nav--item--icon">
							<svg class="xui-icon xui-icon-rotate-270 ds-nav--item--icon-fill"> <use xlink:href="#xui-icon-arrow" role="presentation"/></svg>
						</label>
					{{/if}}
				</div>

				<ul class="ds-nav--nested ds-nav--nested-is-expanded" >
				{{#each menuItem.menu}}
					<li>

						{{#if menu}}
							<span class="ds-nav--group-header">{{header}}</span>
							<ul>
								{{#each menu}}
									<li>
										<a class="ds-nav--child{{#isEqual header @root.sections.0.header}} ds-nav--child-is-selected {{/isEqual}}" href="section-{{referenceURI}}.html">
											{{header}}
										</a>
									</li>
								{{/each}}
							</ul>
						{{else}}
							<a class="ds-nav--child {{#isEqual header @root.sections.0.header}}ds-nav--child-is-selected{{/isEqual}}" href="section-{{referenceURI}}.html">
								{{header}}
							</a>
						{{/if}}
					</li>
				{{/each}}
				</ul>
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
			<div class="xui-select--caret xui-iconwrapper">
				<svg focusable="false" class="xui-icon xui-icon-color-black-muted"> <use xlink:href="#xui-icon-caret" role="presentation" /></svg>
			</div>
		</nav>
	{{/ifSections}}
	`);

	// Returns true if there is more than 1 depth 2 block
	handlebars.registerHelper('ifSections', function (sections, options) {
		return (sections.filter(s => s.depth === 2).length > 0) ? options.fn(this) : options.inverse(this);
	});

	// Returns true if the current header is in the child config options.
	handlebars.registerHelper('hasChildren', function (options) {
		return (options.data.root.options.childPages.indexOf(this.reference) !== -1) ? options.fn(this) : options.inverse(this);
	});
}
