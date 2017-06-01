var path = require('path');
var buildTools = require('xui-webpack-build-tools');
var basePath = path.resolve(__dirname, '..');

module.exports =  function (config) {
	config.set(buildTools.makeKarma({
		basePath: basePath,
		testEntryPoint: path.resolve(__dirname, 'webpack.tests.js'),
		coverage: process.argv.indexOf('--coverage') > -1
	}));
};
