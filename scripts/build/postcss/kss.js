/* eslint-disable no-console */
const {
	rootDirectory,
	taskRunner,
	taskRunnerReturns
} = require('../../helpers');
const path = require('path');
const sassKss = require('../sass/kss');
const doPostCss = require('./doPostCss');
const browsers = require('@xero/browserslist-autoprefixer');
const autoprefixer = require('autoprefixer');
const { succeed, fail } = taskRunnerReturns;

const postcssKss = () => {
	return taskRunner(taskSpinner => {
		return sassKss().then(() =>
			doPostCss(
				{
					inputFile: path.resolve(rootDirectory, 'dist', 'docs', 'style.css'),
					mapFile: path.resolve(rootDirectory, 'dist', 'docs', 'style.css.map'),
					processors: [autoprefixer({ browsers })]
				},
				taskSpinner
			)
				.then(succeed)
				.catch(fail)
		);
	}, __filename);
};

module.exports = postcssKss;
require('make-runnable/custom')({
	printOutputFrame: false
});
