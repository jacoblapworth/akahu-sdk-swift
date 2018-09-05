module.exports = {
	variablePages: [
		{
			section: 'Fundamentals',
			page: 'Depth & Borders',
			source: './src/sass/1-vars/_borders.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Colors',
			source: './src/sass/1-vars/_colors.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables&Mixins',
			name: 'Variables',
			source: './src/sass/1-vars/_layout.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables&Mixins',
			name: 'Typography',
			source: './src/sass/1-vars/_typography.scss'
		}
	],
	mixinPages: [
		{
			section: 'Fundamentals',
			page: 'Variables&Mixins',
			name: 'Buttons',
			source: './src/sass/2-mixins/_buttons.scss',
			isSubsection: true
		},
		{
			section: 'Fundamentals',
			page: 'Variables&Mixins',
			name: 'Components',
			source: './src/sass/2-mixins/_components.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables&Mixins',
			name: 'Elements',
			source: './src/sass/2-mixins/_elements.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables&Mixins',
			name: 'Breakpoints',
			source: './src/sass/2-mixins/_layout.breakpoints.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables&Mixins',
			name: 'Margin & Padding',
			source: './src/sass/2-mixins/_layout.marginpadding.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables&Mixins',
			name: 'Selectors',
			source: './src/sass/2-mixins/_selectors.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables&Mixins',
			name: 'States',
			source: './src/sass/2-mixins/_states.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables&Mixins',
			name: 'Utilities',
			source: './src/sass/2-mixins/_utilities.scss'
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
		icon: 'icon',
		shadow: 'shadow',
		spacing: 'spacing',
		fontSpacing: 'font-spacing',
		table: 'table'
	}
};
