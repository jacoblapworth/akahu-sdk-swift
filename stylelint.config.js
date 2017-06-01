/* global module */
module.exports = {
	"ignoreFiles": [
		['src/sass/_conflicts.scss', 'src/sass/tmp/*']
	],
	"rules": {
		"indentation": "tab",
		"max-line-length": 305,
		"max-nesting-depth": 3,
		"no-duplicate-selectors": true,
		"no-empty-source": true,
		"no-eol-whitespace": true,
		"no-extra-semicolons": true,
		"no-missing-end-of-source-newline": true,

		"declaration-block-properties-order": "alphabetical",

		"declaration-bang-space-after": "never",
		"declaration-bang-space-before": "always",
		"declaration-colon-space-after":"always",
		"declaration-colon-space-before":"never"
	}
};
