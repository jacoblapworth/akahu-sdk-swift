/**
* Example of accepted format for examplecontenttable
*
// ExampleContentTable:
// A preferred example of content | A suboptimal example of content
// Another preferred example of content | Another suboptimal example of content
*/
const renderExampleRows = (data, block) => {
	const rows = data.split('\n');
	let newBlock = '';

	rows.forEach(row => {
		const [doText, dontText] = row.split('|').map(s => s.trim());

		this.row = {
			doText,
			dontText,
		};

		newBlock += block.fn(this);
	});
	return newBlock;
};

module.exports = function (handlebars) {
	handlebars.registerHelper('renderExampleRows', renderExampleRows);
};
