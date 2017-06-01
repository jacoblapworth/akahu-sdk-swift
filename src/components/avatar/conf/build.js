const path = require('path');
const buildTools = require('xui-webpack-build-tools');
const basePath = path.resolve(__dirname, '..');

module.exports =  buildTools.makeWebpack({
	basePath: basePath,
	entry: path.resolve(basePath, 'src', 'test', 'ui', 'test.js'),
	uiTest: true,
	outputFileName: 'test'
});
