/* eslint-disable no-console */
const path = require('path');
const { taskRunner, rootDirectory, taskRunnerReturns } = require('../helpers');
const { succeed, fail } = taskRunnerReturns;
const sassKss = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'sass',
	'kss.js'
));
const cssminXui = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'cssmin',
	'index.js'
));
const buildStyleguide = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'styleguidist.js'
));
const buildStorybook = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'storybook.js'
));
const buildKss = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'kss.js'
));
const buildTokens = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'postcss',
	'tokens.js'
));
const buildUmd = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'umd_webpack.js'
));
const buildServiceWorker = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'serviceworker.js'
));

console.log('buildServiceWorker', buildServiceWorker);

function build() {
	return taskRunner(taskSpinner => {
		return sassKss()
			.then(() => {
				taskSpinner.info('Done with basic build promises');
				return Promise.all([
					buildStyleguide(),
					buildStorybook(),
					buildKss(),
					buildTokens(),
					buildUmd(),
					cssminXui()
				]).then(({ stdout }) => console.log(stdout));
			})
			.then(buildServiceWorker())
			.then(succeed)
			.catch(fail);
	}, __filename);
}

module.exports = build;
require('make-runnable/custom')({
	printOutputFrame: false
});
