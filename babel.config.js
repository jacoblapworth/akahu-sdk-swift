const browsers = require('@xero/browserslist-autoprefixer');

const babelConfig = {
	env: {
		development: {
			presets: [
				'@babel/preset-env',
				'@babel/preset-react',
			],
			plugins: [
				[
					'@babel/plugin-proposal-class-properties',
					{
						loose: true,
					},
				],
			],
		},
		production: {
			presets: [
				[
					'@babel/preset-env',
					{
						useBuiltIns: 'usage',
						targets: {
							browsers,
						},
					},
				],
				'@babel/preset-react'
			],
			plugins: [
				[
					'@babel/plugin-proposal-class-properties',
					{
						loose: true
					}
				]
			]
		},
		test: {
			presets: [
				[
					'@babel/preset-env',
					{
						useBuiltIns: 'usage',
						targets: {
							browsers,
						},
					},
				],
				'@babel/preset-react',
			],
			plugins: [
				[
					'babel-plugin-transform-require-ignore',
					{
						extensions: ['.scss'],
					},
				],
				[
					'@babel/plugin-proposal-class-properties',
					{
						loose: true,
					},
				],
				[
					'@babel/plugin-transform-runtime',
					{
						regenerator: true,
					},
				],
			],
		},
	},
};

module.exports = babelConfig;
