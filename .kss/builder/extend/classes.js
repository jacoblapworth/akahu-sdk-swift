module.exports = function(handlebars) {
	/**
	 * Extracts class name, description pair colon separated
	 */
	handlebars.registerHelper('renderClasses', renderClasses);

};

function renderClasses(variables, block) {
	var newBlock = '';
	/**
	 * This regex is responsible for extracting the data used to build a class table.
	 * 
	 * `/^\s*` – The start of the string can consist of 0 or more whitespace characters
	 * `(\w*-(?:\w*-*\w*)+)` – The first capture group extracts the class (a mix of words and hyphens)
	 * `(?:\s*:\s*(\d+\.\d+\.\d+))?` – The second capture group is optional and extracts the XUI version (a mix of digits and dots)
	 * `\s*:\s*(.*)$/` – The third capture group extracts the description (all remaining characters)
	 * 
	 * Matches: `xui-classname: Class description`
	 * Group 1: "xui-classname"
	 * Group 2: undefined
	 * Group 3: Class description
	 * 
	 * Matches: `xui-classname: 0.0.0: Class description`
	 * Group 1: "xui-classname"
	 * Group 2: 0.0.0
	 * Group 3: Class description
	 */
	var regex = /^\s*(\w*-(?:\w*-*\w*)+)(?:\s*:\s*(\d+\.\d+\.\d+))?\s*:\s*(.*)$/gm;
	var test;

	while ((test = regex.exec(variables)) !== null) {
		this.classes =  {
			name: test[1],
			version: test[2],
			value: test[3],
		};

		newBlock += block.fn(this);
	}
	return newBlock;
}
