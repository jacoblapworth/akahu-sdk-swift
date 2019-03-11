#!/usr/bin/env node
const path = require('path');
const compileSass = require('./compileSass');
const cleanCSS = require('../../clean/css');
const { rootDirectory, taskRunner } = require('../../helpers');

function buildXuiSass(clean) {
	return taskRunner(taskSpinner => {
		if (clean) {
			cleanCSS();
		}
		return compileSass({
			files: [
				{
					file: path.resolve(rootDirectory, 'src', 'sass', 'xui.scss'),
					outFile: path.resolve(rootDirectory, './.tmp', 'xui.css'),
					sourceMap: true,
					includePaths: ['src/']
				},
				{
					file: path.resolve(rootDirectory, 'src', 'sass', 'xui-base.scss'),
					outFile: path.resolve(rootDirectory, './.tmp', 'xui-base.css'),
					sourceMap: true,
					includePaths: ['src/']
				}
			],
			taskSpinner,
			createFolders: [path.resolve(rootDirectory, './.tmp')]
		});
	}, __filename);
}

module.exports = buildXuiSass;
require('make-runnable/custom')({
	printOutputFrame: false
});
