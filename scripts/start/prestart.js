/* eslint-disable no-console */
const path = require('path');
const { rootDirectory, taskRunner, taskRunnerReturns } = require('../helpers');
const { succeed, fail } = taskRunnerReturns;

const cssMinXui = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'cssmin'
));
const buildKss = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'kss'
));
const postCssXui = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'postcss',
	'xui'
));
const postCssKss = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'postcss',
	'kss'
));
const tokens = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'postcss',
	'tokens'
));
const buildBabel = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'babel'
));
const buildStorybook = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'storybook'
));
const buildStyleguide = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'styleguidist'
));
const buildUmd = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'umd_webpack'
));

function preStart() {
	return taskRunner(() => {
		return Promise.all([
			cssMinXui(),
			buildKss(),
			postCssXui(),
			postCssKss(),
			tokens(),
			buildBabel(),
			buildStorybook(),
			buildStyleguide(),
			buildUmd()
		])
			.then(succeed)
			.catch(fail);
	}, __filename);
}

module.exports = preStart;
require('make-runnable/custom')({
	printOutputFrame: false
});
