const path = require('path');
const autoprefixer = require('autoprefixer');
const browserlist = require('@xero/browserslist-autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const basePath = path.resolve(__dirname, '..');
const styleguidePath = path.resolve(basePath, 'styleguide');
const outputPath = path.resolve(basePath, 'docs/react');
const componentSections = require('./sections.json');

const config = {
	webpackConfig: {
		module: {
			loaders: [
				{
					loader: ExtractTextPlugin.extract({
						use: [
							'css-loader',
							{
								loader: 'postcss-loader',
								options: {
									ident: 'postcss',
									plugins: () => [
										autoprefixer({
											browsers: browserlist,
										}),
									],
								},
							},
							{
								loader: 'sass-loader',
								options: {
									includePaths: [path.resolve(basePath, 'bower_components')]
								}
							},
						],
					}),
					test: /\.(scss|css)$/,
				},
				{
					loaders: [
						"file-loader",
					],
					test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
				},
				{
					exclude: [
						/node_modules/,
					],
					loaders: [
						"babel-loader?{\"cacheDirectory\":true,\"presets\":[\"@xero/babel-preset-xero\"]}",
					],
					test: /\.(js|jsx)$/,
				},
			],
		},
		plugins: [
			new ExtractTextPlugin('build/[name].css')
		],
		resolve: {
			alias: {
				"./theme": path.resolve(styleguidePath, "components/theme"),
				"rsg-components/ComponentsList": path.resolve(styleguidePath, "components/ComponentsList"),
				"rsg-components/ExamplePlaceholder": path.resolve(styleguidePath, "components/ExamplePlaceholder"),
				"rsg-components/Link": path.resolve(styleguidePath, "components/Link"),
				"rsg-components/StyleGuide/StyleGuideRenderer": path.resolve(styleguidePath, "components/StyleGuide"),
				"rsg-components/TableOfContents/TableOfContentsRenderer": path.resolve(styleguidePath, "components/TableOfContents"),
				"rsg-components/Preview": path.resolve(styleguidePath, "components/Preview")
			},
			extensions: [
				".js",
				".jsx",
				".json",
			],
		},
	},
	title: 'XUI React Docs',
	styleguideDir: outputPath,
	assetsDir: path.resolve(__dirname, '..', 'uitest'),
	template: path.resolve(styleguidePath, 'template.html'),
	ignore: [
		"**/Positioning.js",
		"**/Constants.js",
		"**/TextHelpers.js",
		"**/__tests__/**"
	],
	sections: componentSections,
};

module.exports = config;
