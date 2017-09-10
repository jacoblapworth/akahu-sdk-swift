const { types } = require('../parser/constants');
const tinycolor = require('tinycolor2');

module.exports = function(handlebars) {
	handlebars.registerHelper('renderTokens', renderTokens)
};

const testString = 'To understand what recursion is, you must first understand recursion.';


function renderTokens(tokens, tokentype) {
	return tokens.split('\n').map(token => {
		const matches = token.match(/[^:]+/g).map(match => match.trim());
		const name = matches[0];
		const value = matches[1];
		const heading = matches[2];
		const description = matches[3];
		return renderToken(tokentype, name, value, heading, description);
	}).join('');
}

function renderToken(type, name, value, heading, description) {
	let example;
	switch(type) {
		case types.color:
			const codeTextClass = tinycolor(value).isDark() ?
				'ds-colour-code-light' : null;
			example = `
					<div class="ds-colour-example" style="background-color:${value}">
						<code class="${codeTextClass}">${value}</code>
						<code class="${codeTextClass}">${name}</code>
					</div>`;
			return singleColour(example, heading, description);
		case types.border:
			example = `
				<div class="ds-colour-example" style="border:${value}">
					<code>${name}</code>
				</div>`;
			return singleColour(example, heading, description);
		case types.shadow:
			example = `
				<div class="ds-colour-example" style="box-shadow:${value}">
					<code>${name}</code>
				</div>`;
			return singleColour(example, heading, description);
		case types.fontSize:
			example = `<span class="xui-text-truncated" style="font-size:${value};">Aa</span>`;
			return typographySection(example);
		case types.fontWeight:
			example = `<span style="font-weight:${value};">Aa</span>`;
			return typographySection(example);
		case types.lineHeight:
			example = `<span style="line-height:${value}">${testString}</span>`;
			return typographySection(example);
		case types.spacing:
			example = `<span style="letter-spacing:${value}">${testString}</span>`;
			return typographySection(example);
		default:
			return '';
	}
}


const typographySection = (example, name, value) => `
<div class="kss-modifier__example ds-section-part">
	<div class="ds-token-wrap">
		<div class="xui-row-flex xui-justify-left">
			<div class="ds-token-table--row ds-token-vertical-align xui-column-12-of-12">
				<div class="xui-column-5-of-12">
					<code class="ds-token-text">${name}</code>
				</div>
				<div class="xui-column-3-of-12">
					<code class="ds-token-text">${value}</code>
				</div>
				<div class="xui-column-4-of-12">
					${example}
				</div>
			</div>
		</div>
	</div>
</div>`;

const singleColour = (example, heading, description) => `
	<div class="kss-modifier__example ds-section-part">
		<div class="ds-colour-section xui-margin-bottom">
			<div class="ds-colour-example-container">
				${example}
			</div>
			<div class="ds-colour-description xui-margin-horizontal xui-margin-vertical-small">
				<div class="xui-heading-item xui-margin-none">${heading}</div>
				<div>${description || ''}</div>
			</div>
		</div>
	</div>`;

function isInverted(name, options) {
	return /inverted/i.test(name) ? options.fn(this) : options.inverse(this);
}
