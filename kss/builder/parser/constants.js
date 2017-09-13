module.exports = {
	templates: [
		{
			name: 'Depth & Borders',
			source: './src/sass/settings/_borders.scss'
		},
		{
			name: 'Colors',
			source: './src/sass/settings/_colors.scss'
		},
		{
			name: 'Typography',
			source: './src/sass/settings/_typography.scss',
			isSubsection: true
		}
	],
	types: {
		border: 'border',
		brights: 'brights',
		color: 'color',
		transparentColor: 'transparent-color',
		fontSize: 'font-size',
		fontWeight: 'font-weight',
		lineHeight: 'line-height',
		shadow: 'shadow',
		spacing: 'spacing'
	}
};
