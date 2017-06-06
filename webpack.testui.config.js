const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = function (env) {
  const componentName = env && (env.c || env.component);
  if (!componentName) {
    throw new Error('A component name is required.');
  }

  const uiTestDir = path.join(__dirname, 'src', 'react', 'components', componentName, 'uitest');
	return {
		entry: [path.join(uiTestDir, 'demo.js'), path.join(__dirname, 'src', 'sass', 'xui.scss')],
		target: 'web',
		devtool: 'inline-source-map',
		output: {
			path: path.join(__dirname, 'uitest', 'assets'),
			filename: 'test.js'
		},
		plugins: [
			new ExtractTextPlugin('test.css')
		],
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
}
