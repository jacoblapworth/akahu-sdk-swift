const { types } = require('../parser/constants');
const tinycolor = require('tinycolor2');
const cn = require('classnames');

module.exports = function(handlebars) {
	handlebars.registerHelper('renderTokens', renderTokens)
};

const testString = 'To understand what recursion is, you must first understand recursion.';

const tableTokens = [
	types.fontSize,
	types.fontWeight,
	types.lineHeight,
	types.fontSpacing,
	types.spacing,
	types.icon,
	types.table
];

const swatchTokens = [
	types.color,
	types.transparentColor,
	types.border,
	types.shadow
];

const styleAttributeMap = {
	[types.border]: 'border',
	[types.shadow]: 'box-shadow',
	[types.transparentColor]: 'background-color',
	[types.color]: 'background-color',
};

function renderTokens(tokens, tokenType) {
	if (tableTokens.includes(tokenType)) {
		return renderTableTokens(tokens, tokenType);
	} else if (swatchTokens.includes(tokenType)) {
		return renderSwatchTokens(tokens, tokenType);
	} else if (tokenType === types.brights) {
		return renderBrightsTokens(tokens, tokenType);
	}
}

const exampleHasBackground = tokenType =>
	[types.border, types.shadow, types.transparentColor].includes(tokenType);

const renderSwatchTokens = (tokens, tokenType) => {
	const swatches = tokens.split('\n').map((token, index, totalArray) => {
		const matches = token.match(/[^:]+/g).map(match => match.trim());
		const name = matches[0];
		const value = matches[1];
		const heading = matches[2];
		const description = matches[3];
		const variable = matches[4];

		const isPartOfGradient = name.match(/[0-9]\b/) != null || name === "$xui-color-white";
		const isBorderish = tokenType === types.border || tokenType === types.shadow;

		const isMainSwatch =
			name.endsWith('-1')
			|| name == "$xui-color-white";
		const isTop =
			name.indexOf('overlap-top') !== -1
			|| name == "$xui-color-white";
		const isBottom =
			name.indexOf('overlap-bottom') !== -1
			|| name == "$xui-color-white";
		const shouldHaveTopPadding =
			index === 0
			|| isBorderish;
		const shouldHaveBottomPadding =
			index === totalArray.length - 1
			|| isBorderish;

		const verticalPadding = cn(
			{
				'xui-padding-top': shouldHaveTopPadding,
				'xui-padding-bottom': shouldHaveBottomPadding,
			}
		);
		const swatchContainerClasses = cn(
			verticalPadding,
			{
				'xui-padding-horizontal': exampleHasBackground(tokenType),
				'ds-background-blue': tokenType === types.transparentColor,
				'ds-color-swatch-container': !isBorderish,
				'ds-border-swatch-container': isBorderish
			}
		);
		const codeBlockClasses = cn(
			'ds-color-swatch-code',
			{'ds-color-swatch-code-light' : tinycolor(value).getBrightness() < 180 && !isBorderish}
		);
		const swatchClasses = cn(
			'xui-padding-xsmall',
			{
				'ds-color-swatch-main': isMainSwatch,
				'ds-border-swatch-top': isTop,
				'ds-border-swatch-bottom': isBottom,
				'ds-color-swatch': !isBorderish,
				'ds-border-swatch': isBorderish,

			}
		);
		const swatchStyle = `${styleAttributeMap[tokenType]}: ${value};`;
		const rowClasses = cn(
			'ds-color-section',
			{'xui-margin-bottom': !isPartOfGradient && !isBorderish}
		)

		return `
			<div class="${rowClasses}">
				<div class="${swatchContainerClasses}">
					<div class="${swatchClasses}" style="${swatchStyle}">
						<code class="${codeBlockClasses}">${name}</code>
						<code class="${codeBlockClasses}">${!isBorderish ? value : ''}</code>
					</div>
				</div>
				<div class="xui-u-flex-1 xui-margin-left xui-margin-top-small ${verticalPadding}">
					<div class="xui-heading-item">${heading}</div>
					<div class="xui-margin-top-xsmall">${description || ''}</div>
					<div>${variable ? "<code class='ds-border-variable xui-margin-top-xsmall'>"+ variable + "</code>" : ''}</div>
				</div>
			</div>`;
	}).join('');

	return `
		<div class="kss-modifier__example ds-section-part">
			${swatches}
		</div>`;
}

const renderBrightsTokens = tokens => {
	const variableRegex = /(\$xui-color-(\w*)-?(\w*)?)\s*:\s*(\S*)/;
	const colorGroups = {};
	const variants = ['xlight', 'light', 'standard', 'dark', 'xdark'];
	tokens.split('\n').forEach(token =>{
		const match = token.match(variableRegex);
		const name = match[1];
		const group = match[2];
		const variant = match[3];
		const value = match[4];
		colorGroups[group] = colorGroups[group] || {};

		colorGroups[group][variant || 'standard'] = {
			name,
			value,
		};
	});
	const brightsSections = Object.keys(colorGroups).map(groupName => {
		const group = colorGroups[groupName];

		const swatches = variants.map(variant => {
			const color = group[variant];
			const textColor = (variant === 'light' || variant === 'xlight')
			 ? group['xdark'].value
			 : '';
			const classes = cn(
				'ds-color-swatch',
				'xui-padding-xsmall',
				{'ds-color-swatch-main': variant === 'standard'}
			);
			return `
				<div style="background-color:${color.value};" class="${classes}">
					<code class="ds-color-swatch-code ds-color-swatch-code-light" style="color:${textColor};">${color.name}</code>
					<code class="ds-color-swatch-code ds-color-swatch-code-light" style="color:${textColor};">${color.value}</code>
				</div>
			`.replace('\n\t','');
		}).join('');
		return `
			<div class="ds-brights-group xui-margin-right-large xui-margin-bottom-large">
				${swatches}
			</div>
		`;
	}).join('');

	return `
		<div class="ds-brights-section">
			${brightsSections}
		</div>
	`;
}

const renderTableTokens = (tokens, tokenType) => {
	const examples = tokens.split('\n').map(token => {
		tokens.split('\n')
		const matches = token.match(/[^:]+/g).map(match => match.trim());
		const name = matches[0];
		const value = matches[1];
		let example;
		switch(tokenType) {
			case types.fontSize:
				example = `<span class="xui-text-truncated" style="font-size:${value};">Aa</span>`;
				break;
			case types.fontWeight:
				example = `<span style="font-weight:${value};">Aa</span>`;
				break;
			case types.lineHeight:
				example = `<span style="line-height:${value}">${testString}</span>`;
				break;
			case types.fontSpacing:
				example = `<span style="letter-spacing:${value}">${testString}</span>`;
				break;
			case types.spacing:
				example = `<div style="width:${value};height:${value};" class="ds-spacing-example"></div>`;
				break;
			case types.icon:
				example = `<div class="xui-iconwrapper xui-iconwrapper-medium"><svg focusable="false" style="width:${value};height:${value}" class="xui-icon" role="presentation"><use xlink:href="#xui-icon-search"/></svg></div>`;
				break;
			case types.table:
				example = '';
				break;
			default:
				return '';
		}
		return typographyRow(example, name, value);
	}).join('');
	return `
		<ul class="xui-contentblock">
			${examples}
		</ul>`;
}

const typographyRow = (example, name, value) => `
	<li class="xui-contentblockitem xui-padding-vertical-small xui-u-flex">
		<div class="xui-column-5-of-12">
			<code>${name}</code>
		</div>
		<div class="xui-column-3-of-12">
			<code>${value}</code>
		</div>
		<div class="xui-column-4-of-12">
			${example}
		</div>
	</li>`;
