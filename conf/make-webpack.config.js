var path = require('path');
var basePath = path.join(__dirname, '..');
var webpackFactory = require('xui-webpack-build-tools').makeWebpack;
var entry = path.resolve(basePath, 'index.js');


module.exports = function (options) {
	options = options || {};
	options.basePath = basePath;
	options.entry = entry;
	options.outputFileName = 'XUIButton';
	return webpackFactory(options);
};
