module.exports = {
	variablePages: [
		{
			section: 'Fundamentals',
			page: 'Depth & Borders',
			source: './src/sass/settings/_borders.scss'
		},
		{
			section: 'Fundamentals',
			page: 'Colors',
			source: './src/sass/settings/_colors.scss'
		},
		{
			section: 'Building Blocks',
			page: 'Variables & Mixins',
			name: 'Variables',
			source: './src/sass/settings/_layout.scss'
		},
		{
			section: 'Building Blocks',
			page: 'Variables & Mixins',
			name: 'Typography',
			source: './src/sass/settings/_typography.scss'
		}
	],
	mixinPages: [
		{
			section: 'Building Blocks',
			page: 'Variables & Mixins',
			name: 'Buttons',
			source: './src/sass/tools/_mixins.buttons.scss',
			isSubsection: true
		},
		{
			section: 'Building Blocks',
			page: 'Variables & Mixins',
			name: 'Components',
			source: './src/sass/tools/_mixins.components.scss'
		},
		{
			section: 'Building Blocks',
			page: 'Variables & Mixins',
			name: 'Elements',
			source: './src/sass/tools/_mixins.elements.scss'
		},
		{
			section: 'Building Blocks',
			page: 'Variables & Mixins',
			name: 'Breakpoints',
			source: './src/sass/tools/_mixins.layout.breakpoints.scss'
		},
		{
			section: 'Building Blocks',
			page: 'Variables & Mixins',
			name: 'Margin & Padding',
			source: './src/sass/tools/_mixins.layout.marginpadding.scss'
		},
		{
			section: 'Building Blocks',
			page: 'Variables & Mixins',
			name: 'Selectors',
			source: './src/sass/tools/_mixins.selectors.scss'
		},
		{
			section: 'Building Blocks',
			page: 'Variables & Mixins',
			name: 'States',
			source: './src/sass/tools/_mixins.states.scss'
		},
		{
			section: 'Building Blocks',
			page: 'Variables & Mixins',
			name: 'Utilities',
			source: './src/sass/tools/_mixins.utilities.scss'
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
