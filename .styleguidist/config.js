const path = require('path');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer');
const browserlist = require('@xero/browserslist-autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const serveStatic = require('serve-static');

const basePath = path.resolve(__dirname, '..');
const styleguidePath = path.resolve(basePath, '.styleguidist');
const outputPath = path.resolve(basePath, 'dist/docs/react');
const componentSections = require('./sections.json');

const config = {
	webpackConfig: {
		devServer: {
			disableHostCheck: true,
			publicPath: 'http://localhost:6060/react/',
			before(app) {
				app.use('/', serveStatic(path.resolve('dist', 'docs')))
			}
		},
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
				"rsg-components/Wrapper/Wrapper": path.resolve(styleguidePath, "components/Wrapper"),
				"rsg-components/Pathline": path.resolve(styleguidePath, "components/Pathline"),
				"rsg-components/Playground/PlaygroundRenderer": path.resolve(styleguidePath, "components/PlaygroundRenderer")
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
	highlightTheme: 'erlang-dark',
	ignore: [
		"**/Positioning.js",
		"**/Constants.js",
		"**/TextHelpers.js",
		"**/__tests__/**"
	],
	sections: componentSections,
	template: {
		head: {
			links: [
				{
					rel: 'stylesheet',
					href: '../dist/xui.css'
				}
			]
		}
	},
	getComponentPathLine(componentPath) {
		let name = path.basename(componentPath, '.js');
		const dir = path.dirname(componentPath).split('/').pop();
		const dirToLower = dir.toLowerCase(); // TODO: Normalise casing strategy between files and component directory names. Currently mismatched.

		/**
		* General rule of thumb for import component statements, if the name of the
		* component (minus the xui portion) matches the name of the directory it
		* lives in it's the default export for that component. Default exports do
		* not need the braces in their import statements so we should only add
		* these for individual ones.
		*/
		if(name.toLowerCase().split('xui').pop() !== dirToLower.replace('-','')) { // TODO: Remove hyphen removal and rename select-box/ -> selectBox/
			name = `{ ${name} }`
		}

		return `import ${name} from '${pkg.name}/react/${dirToLower}';`;
  }
};

module.exports = config;
