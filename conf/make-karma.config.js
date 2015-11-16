var path = require('path');

var basePath = path.join(__dirname, '..');
var testEntryPoint = path.resolve(__dirname, 'webpack.tests.js');
var karmaFactory = require('xui-webpack-build-tools').makeKarma;

module.exports = function (options) {
	options = options || {};
	options.basePath = basePath;
	options.testEntryPoint = testEntryPoint;

	return karmaFactory(options);
};
