var path = require('path');
var buildTools = require('xui-webpack-build-tools');
var basePath = path.resolve(__dirname, '..');

module.exports =  buildTools.makeWebpack({
	basePath,
	entry: path.resolve(basePath, 'test', 'ui', 'test.js'),
	uiTest: true
});
