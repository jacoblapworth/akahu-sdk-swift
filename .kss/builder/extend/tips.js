const notColonRegex = /([^:]+)/g;

/**
* Example of accepted format for tips
*
// Tips:
// Do: Do something exceptional
// Do: Something else good we should do
// Dont: Don't do that
// Do: Is in a random order. Also this text should be super long. It will wrap nicelyt and not look completely foolish next to the other tips.
// Warning: I'm warning you
*/

/**
* Match title with icon classes and names
*/
const matchTitleToIcon = title => {
	const tipIcons = {
		do: {
			iconClass: 'ds-tips-positive',
			iconName: '#xui-icon-checkbox-check'
		},
		dont: {
			iconClass: 'ds-tips-negative',
			iconName: '#xui-icon-cross'
		},
		warning: {
			iconClass: 'ds-tips-warning',
			iconName: '#xui-icon-warning'
		}
	}

	return tipIcons[title];
}

const renderTips = (data, block) => {
	const tips = data.split('\n');
	const classname = 'ds-tips';
	let newBlock = '';

	tips.forEach(tip => {
		const parts = tip.match(notColonRegex);
		const icon = matchTitleToIcon(parts[0].toLowerCase().replace(/'/g, ''));
		const details = parts.slice(1).map( s => s.trim() );

		this.tip = {
			iconName: icon.iconName,
			iconClass: icon.iconClass,
			details: details
		}
		newBlock += block.fn(this);
	});
	return newBlock;
}


module.exports = function(handlebars) {
	handlebars.registerHelper('renderTips', renderTips);
};
