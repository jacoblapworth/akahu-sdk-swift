/* eslint-disable no-console */
const {
	rootDirectory,
	taskRunner,
	taskRunnerReturns,
	copyFile
} = require('../../helpers');
const sassXui = require('../sass/xui');
const path = require('path');
const doPostCss = require('./doPostCss');
const browsers = require('@xero/browserslist-autoprefixer');
const autoprefixer = require('autoprefixer');
const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp'));
const { succeed, fail } = taskRunnerReturns;

const folders = [
	path.resolve(rootDirectory, 'dist', 'css'),
	path.resolve(rootDirectory, 'dist', 'docs', 'kss-assets'),
	path.resolve(rootDirectory, 'dist', 'docs', 'dist'),
	path.resolve(rootDirectory, 'dist', 'docs', 'storybook')
];
const createFolders = folders.map(folder => mkdirp(folder));

const postcssXui = () =>
	taskRunner(taskSpinner => {
		return Promise.all(createFolders).then(() =>
			sassXui().then(() => {
				return doPostCss(
					{
						title: __filename,
						inputFile: path.resolve(rootDirectory, './.tmp', 'xui.css'),
						mapFile: path.resolve(rootDirectory, './.tmp', 'xui.css.map'),
						processors: [autoprefixer({ browsers })]
					},
					taskSpinner
				)
					.then(() => {
						folders.forEach(folder => {
							const finalFileToWrite = path.resolve(folder, 'xui.css');
							taskSpinner.info(`Writing File: ${finalFileToWrite}`);

							copyFile(
								path.resolve(rootDirectory, '.tmp', 'xui.css'),
								finalFileToWrite
							);
						});
					})
					.then(succeed)
					.catch(fail);
			})
		);
	}, __filename);

module.exports = postcssXui;
require('make-runnable/custom')({
	printOutputFrame: false
});
