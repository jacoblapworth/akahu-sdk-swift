/* global require, module, __dirname, process */
const path = require('path');
const buildTools = require('xui-webpack-build-tools');
const basePath = path.resolve(__dirname, '..');

const karmaConfig = buildTools.makeKarma({
	basePath,
	testEntryPoint: path.resolve(__dirname, 'webpack.tests.js'),
	coverage: process.argv.indexOf('--coverage') > -1,
	watch: process.argv.indexOf('--watch') > -1
});

module.exports = config => config.set(karmaConfig);
