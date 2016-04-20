const path = require('path');
const buildTools = require('xui-webpack-build-tools');
const basePath = path.resolve(__dirname, '..');

const karmaConfig = buildTools.makeKarma({
	basePath: basePath,
	testEntryPoint: path.resolve(__dirname, 'webpack.tests.js'),
	coverage: process.argv.indexOf('--coverage') > -1,
	watch: true
});

module.exports = config => config.set(karmaConfig);
