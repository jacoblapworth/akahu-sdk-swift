const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const version = require('./package.json').version;

module.exports = {
	mode: 'production',
	entry: path.join(__dirname, 'src', 'react', 'umd.js'),
	target: 'web',
	output: {
		path: path.join(__dirname, 'dist', 'umd', 'assets'),
		filename: `xui.umd.${version}.js`,
		library: 'XUI',
		libraryTarget: 'umd',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `xui.umd.${version}.css`
		})
	],
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							ident: 'postcss',
							plugins: () => [
								autoprefixer({
									overrideBrowserslist: require('@xero/browserslist-autoprefixer'),
								}),
							]
						}
					},
					"css-loader",
					"sass-loader"
				]
			},
		],
	},
};
