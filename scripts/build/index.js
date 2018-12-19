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
const xuiCss = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'xui.js'
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

async function build() {
	await taskRunner(taskSpinner => {
		return Promise.all([sassKss(), xuiCss()])
			.then(() => {
				taskSpinner.info('Done with basic build promises');
				return Promise.all([
					buildStyleguide(),
					buildKss({
						skipPostCss: true
					}),
					buildStorybook({
						skipPostCss: true
					}),
					buildTokens(),
					buildUmd()
				]).then(({ stdout, stderr }) => console.log(stdout, stderr));
			})
			.then(buildServiceWorker())
			.then(succeed)
			.catch(fail);
	}, __filename);

	process.exit(0);

}

module.exports = build;
require('make-runnable/custom')({
	printOutputFrame: false
});
