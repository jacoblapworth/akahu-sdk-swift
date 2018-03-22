#!/usr/bin/env node
const path = require('path');
const compileSass = require('./compileSass');
const cleanCSS = require('../../clean/css');
const { rootDirectory, taskRunner } = require('../../helpers');

const files = [
	{
		file: path.resolve(rootDirectory, 'src', 'sass', 'xui.scss'),
		outFile: path.resolve(rootDirectory, 'dist', 'css', 'xui.css'),
		sourceMap: true,
		includePaths: ['src/']
	},
	{
		file: path.resolve(rootDirectory, 'src', 'sass', 'xui.scss'),
		outFile: path.resolve(
			rootDirectory,
			'dist',
			'docs',
			'kss-assets',
			'xui.css'
		),
		sourceMap: true,
		includePaths: ['src/']
	},
	{
		file: path.resolve(rootDirectory, 'src', 'sass', 'xui.scss'),
		outFile: path.resolve(
			rootDirectory,
			'dist',
			'docs',
			'storybook',
			'xui.css'
		),
		sourceMap: false,
		includePaths: ['src/']
	},
	{
		file: path.resolve(rootDirectory, 'src', 'sass', 'xui.scss'),
		outFile: path.resolve(rootDirectory, 'dist', 'docs', 'dist', 'xui.css'),
		sourceMap: true,
		includePaths: ['src/']
	}
];

const createFolders = [
	path.resolve(rootDirectory, 'dist', 'css'),
	path.resolve(rootDirectory, 'dist', 'docs', 'kss-assets'),
	path.resolve(rootDirectory, 'dist', 'docs', 'dist'),
	path.resolve(rootDirectory, 'dist', 'docs', 'storybook')
];

function buildXuiSass(clean) {
	return taskRunner(taskSpinner => {
		if (clean) {
			cleanCSS();
		}
		return compileSass({ files, taskSpinner, createFolders });
	}, __filename);
}

module.exports = buildXuiSass;
require('make-runnable/custom')({
	printOutputFrame: false
});
