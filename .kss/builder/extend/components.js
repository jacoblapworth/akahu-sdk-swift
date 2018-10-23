module.exports = function (handlebars) {
	/**
	 * Extracts component names and returns name + relative styleguide url
	 */
	handlebars.registerHelper('renderComponents', renderComponents);

};

function renderComponents(variables, block) {
	var newBlock = '';

	variables.split(',').forEach(function (component) {
		var name = component.trim();
		var componentData = {
			name: name,
			url: './react/#' + name.toLowerCase()
		}
		newBlock += block.fn(componentData);
	});

	return newBlock;
}
