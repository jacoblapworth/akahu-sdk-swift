const {marked} = require('../../../node_modules/marked');
module.exports = function(handlebars) {
	handlebars.registerHelper('renderDefinitions', renderDefinitions);
	handlebars.registerHelper('renderTwoCols', renderTwoCols);
};

const notColonRegex = /([^:]+)/g;

function renderTwoCols(data, block) {
	const rows = data.split('\n');
	const className = 'ds-definition-two-cols';
	if ( rows.length > 0) {
		return (rows[0].match(notColonRegex).length === 2) ? className : '';
	}
};

function renderDefinitions(data, block) {
	let newBlock = '';
	const rows = data.split('\n');

	rows.map( row => {
		const parts = row.match(notColonRegex);
		const dd = parts.slice(1).map( s => {
			return marked.parse(s.trim());
		});
		this.definition = {
			dt: parts[0],
			dd: dd
		}
		newBlock += block.fn(this);
	});
	return newBlock;
}
