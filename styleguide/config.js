const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const browserlist = require('@xero/browserslist-autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const basePath = path.resolve(__dirname, '..');
const componentPath = path.resolve(basePath, 'src/react');
const styleguidePath = path.resolve(basePath, 'styleguide');

//
// component sections
//
const componentsFolder = fs.readdirSync(componentPath);
// TODO include in filter for umd.js
const filterJsFile = file => /\.js$/.test(file);
const replaceJsExtension = file => file.replace('.js', '');
const createSectionObject = file => ({
	name: file.charAt(0).toUpperCase() + file.slice(1),
	components: `${componentPath}/components/${file}/**/[A-Z]*.js`,
	content: `${componentPath}/${file}.md`,
});
const componentSections = componentsFolder
	.filter(filterJsFile)
	.map(replaceJsExtension)
	.map(createSectionObject);

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
	title: 'XUI Components',
	styleguideDir: styleguidePath,
	ignore: [
		"**/Positioning.js",
		"**/Constants.js",
		"**/TextHelpers.js",
		"**/__tests__/**"
	],
	sections: componentSections,
};

module.exports = config;
