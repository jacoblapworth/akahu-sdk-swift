var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BowerWebpackPlugin = require("bower-webpack-plugin");
var path = require('path');

module.exports = {
	context: path.join(__dirname, 'ui'),
	entry: './test.js',
	output: {
		path: path.join(__dirname, 'ui'),
		filename: 'test.bundle.js'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.scss$/,
				loaders: [
					ExtractTextPlugin.extract('style-loader'),
					'css-loader',
					'autoprefixer-loader',
					'sass-loader?includePaths[]=' + path.join(__dirname, '..', 'bower_components')
				]
			},
			{ test: /\.svg$/, loader: 'url-loader' },
			{ test: /\.(png|jpg|jpeg|gif)$/, loader: 'file-loader' },
			{ test: /\.js$/, loader: 'babel-loader' }
		]
	},
	plugins: [
		new BowerWebpackPlugin(),
		new ExtractTextPlugin('style.css', {
			allChunks: true
		})
	],
	eslint: {
		configFile: '.eslintrc',
		quiet: false
	}
};