module.exports = {
	variablePages: [
		{
			section: 'Fundamentals',
			page: 'Depth and borders',
			source: './src/sass/1-vars/_borders.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Colors',
			source: './src/sass/1-vars/_colors.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables and mixins',
			name: 'Variables',
			source: './src/sass/1-vars/_layout.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables and mixins',
			name: 'Typography',
			source: './src/sass/1-vars/_typography.scss'
		}
	],
	mixinPages: [
		{
			section: 'Fundamentals',
			page: 'Variables and mixins',
			name: 'Buttons',
			source: './src/sass/2-mixins/_buttons.scss',
			isSubsection: true
		},
		{
			section: 'Fundamentals',
			page: 'Variables and mixins',
			name: 'Components',
			source: './src/sass/2-mixins/_components.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables and mixins',
			name: 'Elements',
			source: './src/sass/2-mixins/_elements.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables and mixins',
			name: 'Breakpoints',
			source: './src/sass/2-mixins/_layout.breakpoints.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables and mixins',
			name: 'Margin and padding',
			source: './src/sass/2-mixins/_layout.marginpadding.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables and mixins',
			name: 'Selectors',
			source: './src/sass/2-mixins/_selectors.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables and mixins',
			name: 'States',
			source: './src/sass/2-mixins/_states.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Variables and mixins',
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
