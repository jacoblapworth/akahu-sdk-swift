module.exports = function(handlebars) {
	/**
	 * Extracts class name, description pair colon separated
	 */
	handlebars.registerHelper('renderClasses', renderClasses);

};

function renderClasses(variables, block) {
	var newBlock = '';
	var regex = /^\s*(\w*-(?:\w*-*\w*)+)\s*:\s*(.*)$/gm;
	var test;

	while ((test = regex.exec(variables)) !== null) {
		this.classes =  {
			name: test[1],
			value: test[2]
		};

		newBlock += block.fn(this);
	}
	return newBlock;
}
