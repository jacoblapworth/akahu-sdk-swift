const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: path.join(__dirname, 'src', 'react', 'umd.js'),
	target: 'web',
	output: {
		path: path.join(__dirname, 'umd', 'assets'),
		filename: 'xui.umd.js',
		library: 'XUI',
		libraryTarget: 'umd'
	},
	plugins: [
		new ExtractTextPlugin('xui.latest.css')
	],
	externals: {
			'react': 'React',
			'react-dom': 'ReactDOM'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: () => [
									autoprefixer({
										browsers: require('@xero/browserslist-autoprefixer')
									})
								]
							}
						},
						'sass-loader'
					]
				})
			}
		]
	}
};
