/* eslint-disable no-console */
const {
	rootDirectory,
	taskRunner,
	taskRunnerReturns
} = require('../../helpers');
const sassXui = require('../sass/xui');
const path = require('path');
const doPostCss = require('./doPostCss');
const browsers = require('@xero/browserslist-autoprefixer');
const autoprefixer = require('autoprefixer');
const { succeed, fail } = taskRunnerReturns;

const postcssXui = () =>
	taskRunner(taskSpinner => {
		return sassXui().then(() =>
			doPostCss(
				{
					title: __filename,
					inputFile: path.resolve(rootDirectory, 'dist', 'css', 'xui.css'),
					mapFile: path.resolve(rootDirectory, 'dist', 'css', 'xui.css.map'),
					processors: [autoprefixer({ browsers })]
				},
				taskSpinner
			)
				.then(succeed)
				.catch(fail)
		);
	}, __filename);

module.exports = postcssXui;
require('make-runnable/custom')({
	printOutputFrame: false
});
