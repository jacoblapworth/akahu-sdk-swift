var path = require('path');
var buildTools = require('xui-webpack-build-tools');
var basePath = path.resolve(__dirname, '..');

module.exports =  buildTools.makeWebpack({
	basePath: basePath,
	entry: path.resolve(basePath, 'test', 'ui', 'test.ui.js'),
	outputPath: path.join(basePath, 'test', 'ui'),
	outputFileName: 'test.ui.bundle'
});

