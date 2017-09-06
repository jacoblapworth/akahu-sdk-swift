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
		}
	],
	types: {
		border: 'border',
		color: 'color',
		fontSize: 'font-size',
		fontWeight: 'font-weight',
		lineHeight: 'line-height',
		shadow: 'shadow',
		spacing: 'spacing'
	}
};
