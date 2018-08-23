const restrictedGlobals = require('eslint-restricted-globals');

module.exports = {
	root: true,
	env: {
		'jest/globals': true,
		node: true,
	},
	parser: 'babel-eslint',
	plugins: ['jest'],
	extends: [
		'@xero/eslint-config-xero-react',
		'plugin:jest/recommended',
		'plugin:jsx-a11y/recommended',
	],
	rules: {
		'arrow-parens': [1, 'as-needed'],
		'comma-dangle': 1,
		'filenames/match-exported': 0, // TODO: Investigate fix. Our react/* files don't match the export names (i.e. tag.js exports XUITag)
		'indent': ['error', 'tab'],
		'jest/no-disabled-tests': 0,
		'jsx-a11y/label-has-for': [ 2, {
			'allowChildren': true
		}],
		'max-len': [1, {
			code: 100,
			comments: 100,
			ignorePattern: "^\\s*import\\s.+\\s*from\\s*.*",// Ignores import strings as some of our paths are too long
			ignoreUrls: true,
			tabWidth: 1
		}],
		'no-console': 'warn',
		'no-restricted-globals': [2,
			...restrictedGlobals
		],
		'no-return-assign': 0, // This rule breaks ref functions
		'no-tabs': 0,
		'no-unused-expressions': 0,
		'object-curly-newline': [2, {
			consistent: true,
			minProperties: 5,
			multiline: true,
		}],
		'prefer-destructuring': [2, {
			object: true,
			array: false, // TODO: Review if we want this. Results in `[firstItem] = array` syntax, which seems odd
		}],
		'react/forbid-prop-types': 0, // TODO: Investigate removing this and defining shapes for all props
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-filename-extension': 0,
		'react/prefer-stateless-function': 0, // Worth disabling while PureComponent is more performant (the override of this rule for PureComponent doesn't work)
		'react/require-default-props': 0, // We would need to add default `qaHook` and `children` props for most components
		'react/sort-comp': 0, // TODO: Either remove class fields or implement this rule once they're supported
	},
	overrides: [{
		"files": ['**/scripts/**/*.js'],
		"rules": {
			"import/no-extraneous-dependencies": "off",
			"import/no-dynamic-require": "off"
		}
	}]
};
