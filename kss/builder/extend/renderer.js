const { regexDictionary, types } = require('../parser/constants');

module.exports = function(handlebars) {
	/**
	 * Extracts the variable properties from the line
	 * returns:
	 *  token name, token value, and optional [ token example ]
	 */
	handlebars.registerHelper('renderTokens', renderTokens);

	/**
	 * Compares the name to see if the container needs to be rendered as inverted.
	 * Similar to the isEqual
	 *
	 * e.g.
	 * {{#isInverted name}}
	 * 		ADD THIS
	 * {{else}} [optional]
	 * 		WILL EXECUTE THIS
	 * {{/isInverted}}
	 */
	handlebars.registerHelper('isInverted', isInverted);
};

const testString = 'To understand what recursion is, you must first understand recursion.';


function renderTokens(variables, block) {
	var newBlock = '';
	var regex = /^(\S+)\s*:\s+(.*)\s+:\s*(.*)$/gm;
	var test;

	while ((test = regex.exec(variables)) !== null) {
		this.token = {};
		this.token.name = test[1];
		this.token.value = test[2];

		if (!!test[3]) {
			this.token.example = getExample(test[3], this.token.value);
		}
		newBlock += block.fn(this);
	}
	return newBlock;
}

function getExample(type, value) {
	var example = '';

	if (type === types.color) {
		example = `<div class="ds-token-box" style="background-color:${value};"></div>`;

	} else if (type === types.border) {
		example = `<div style="border-top:${value};"></div>`;

	} else if (type === types.shadow) {
		example = `<div class="ds-token-box" style="box-shadow:${value};"></div>`;

	} else if (type === types.fontSize) {
		example = `<span class="xui-text-truncated" style="font-size:${value};">Aa</span>`;

	} else if (type === types.fontWeight) {
		example = `<span style="font-weight:${value};">Aa</span>`;

	}	else if (type === types.lineHeight) {
		example = `<span style="line-height:${value}">${testString}</span>`;

	} else if (type === types.spacing) {
		example = `<div class="ds-spacing-example" style="height:${value};width:${value};"></div>`;
	}
	return example;
}

function isInverted(name, options) {
	return regexDictionary.inverted.test(name) ? options.fn(this) : options.inverse(this);
}
