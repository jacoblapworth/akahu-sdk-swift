
module.exports = function (handlebars) {
	handlebars.registerPartial('renderParameters', `
		{{#checkForDefaultValues parameters}}
			<table class="ds-parameters-table">
				<tr>
					<th class="ds-parameters-table-header xui-padding-xsmall">
						Parameter
					</th>
					{{#if hasDefaultValues}}
					<th class="ds-parameters-table-header xui-padding-xsmall">
						Default value
					</th>
					{{/if}}
					<th class="ds-parameters-table-header xui-padding-xsmall">
						Description
					</th>
				</tr>
				{{#if hasDefaultValues}}
					{{#each parameters}}
						<tr>
							<td class="ds-parameters-table-name xui-padding-xsmall">
								<code>{{name}}</code>
							</td>
							<td class="ds-parameters-table-defaultvalue xui-padding-xsmall">
								<code>{{defaultValue}}</code>
							</td>
							<td class="ds-parameters-table-description xui-padding-xsmall">
								{{{description}}}
							</td>
						</tr>
					{{/each}}
				{{else}}
					{{#each parameters}}
						<tr>
							<td class="ds-parameters-table-name xui-padding-xsmall">
								<code>{{name}}</code>
							</td>
							<td class="ds-parameters-table-description xui-padding-xsmall">
								{{{description}}}
							</td>
						</tr>
					{{/each}}
				{{/if}}
			</table>
		{{/checkForDefaultValues}}
		`);
	handlebars.registerHelper('checkForDefaultValues', (parameters, options) => {
		return options.fn({
			parameters,
			hasDefaultValues: parameters.findIndex(parameter =>
				(parameter.defaultValue != null && parameter.defaultValue != '')) !== -1
		});
	});
}

