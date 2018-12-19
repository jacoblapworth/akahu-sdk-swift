const browsers = require('@xero/browserslist-autoprefixer');

const babelConfig = {
	"env": {
		"development": {
			"presets": [
				"@babel/preset-env",
				"@babel/preset-react"
			],
			"plugins": [
				[
					"@babel/plugin-proposal-class-properties",
					{
						loose: true
					}
				]
			]
		},
		"production": {
			"presets": [
				[
					"@babel/preset-env",
					{
						"useBuiltIns": "usage",
						"targets": {
							"browsers": browsers
						}
					}
				],
				"@babel/preset-react"
			]
		},
		"test": {
			"presets": [
				[
					"@babel/preset-env",
					{
						"useBuiltIns": "usage",
						"targets": {
							"browsers": browsers
						}
					}
				],
				"@babel/preset-react"
			],
			"plugins": [
				[
					"babel-plugin-transform-require-ignore",
					{
						"extensions": [".scss"]
					}
				],
				[
					"@babel/plugin-proposal-class-properties",
					{
						loose: true
					}
				]
			]
		}
	}
}

module.exports = babelConfig;
