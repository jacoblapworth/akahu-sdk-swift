module.exports = {
	templates: [
		{
			name: 'Colors',
			source: './src/sass/settings/_colors.scss',
			isGrid: true
		},
		{
			name: 'Typography',
			source: './src/sass/settings/_typography.scss',
			isSubsection: true
		},
		{
			name: 'Margin and Padding.Tokens',
			source: './src/sass/settings/_layout.scss',
			isSubsection: true,
		},
	],

	types: {
		border: 'border',
		color: 'color',
		fontSize: 'font-size',
		fontWeight: 'font-weight',
		lineHeight: 'line-height',
		shadow: 'shadow',
		spacing: 'spacing'
	},

	regexDictionary : {
		border: /^[-]?\d+px\s[\w]\s*/,
		colorHash: /^#[\w\d]+$/,
		colorRgba: /^rgba\(.*\)$/,
		compiledSass: '\.abc{border:(.*)\}',
		font: /font-size/,
		fontWeight: /font-weight/,
		inverted: /inverted/i,
		lineHeight: /line-height/,
		mixedFunction: /mix\(.*\)/,
		rem: /(\d+\.?\d*)rem/,
		repeatedCharacter: /(.)\1{4,}/,
		rgbaWithHex: /rgba\(#([a-f\d]){3,6}/,
		sassVariables: /(\$[^\s,;)]*)/g,
		shadow: /^([-]?[0-9px]+\s){4}(rgba(.*)$|#(.*)$)/,
		size: /(px|rem)$/,
		spacing: /.+-s-.+/
	}
};
