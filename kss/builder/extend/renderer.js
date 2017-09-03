const { regexDictionary, types } = require('../parser/constants');
const tinycolor = require('tinycolor2');

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
	variables.split('\n').forEach(line => {
		var test;
		const matches = line.match(/[^:]+/g).map(match => match.trim());

		if (matches[1]) {
			this.token = {};
			this.token.name = matches[0];
			this.token.value = matches[1];
			this.token.title = matches[3];
			this.token.description = matches[4];
			if (matches[2] != undefined) {
				this.token.example = getExample(matches[2], this.token);
			}
			newBlock += block.fn(this);
		}
	});
	return newBlock;
}

function getExample(type, token) {
	switch(type) {
		case types.color:
			const codeTextClass = tinycolor(token.value).isDark() ?
				'ds-colour-code-light'
				: null;
			return `
					<div class="ds-colour-example" style="background-color:${token.value}">
						<code class="${codeTextClass}">${token.value}</code>
						<code class="${codeTextClass}">${token.name}</code>
					</div>`;
		case types.border:
			return `
				<div class="ds-colour-example" style="border:${token.value}">
					<code>${token.name}</code>
				</div>`;
		case types.shadow:
			return `
					<div class="ds-colour-example" style="box-shadow:${token.value}">
						<code>${token.name}</code>
					</div>`;
		case types.fontSize:
			return  `<span class="xui-text-truncated" style="font-size:${token.value};">Aa</span>`;
		case types.fontWeight:
			return `<span style="font-weight:${token.value};">Aa</span>`;
		case types.lineHeight:
			return `<span style="line-height:${token.value}">${testString}</span>`;
		case types.spacing:
			return `<div class="ds-spacing-example" style="height:${token.value};width:${token.value};"></div>`;
		default:
			return '';
	}
}

function isInverted(name, options) {
	return regexDictionary.inverted.test(name) ? options.fn(this) : options.inverse(this);
}
