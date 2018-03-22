const { promisify } = require('util');
const { exec } = require('child_process');
const path = require('path');
const {
	rootDirectory,
	taskRunner,
	taskRunnerReturns,
	isWindowsPlatform,
	convertExecTaskToWindows
} = require('../helpers');
const sassXui = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'sass',
	'xui.js'
));
const asyncExec = promisify(exec);
const { succeed, fail } = taskRunnerReturns;

function build() {
	return taskRunner(taskSpinner => {
		let execTask =
			'./node_modules/.bin/build-storybook -c .storybook -o dist/docs/storybook';
		if (isWindowsPlatform) {
			execTask = convertExecTaskToWindows(execTask);
		}
		taskSpinner.info(`Executing task: ${execTask}`);
		taskSpinner.warn(
			'This build has been known to take a while so sit back and relax'
		);
		return Promise.all([asyncExec(execTask, { stdio: [0, 1, 2] }), sassXui()])
			.then(succeed)
			.catch(fail);
	}, __filename);
}

module.exports = build;
require('make-runnable/custom')({ printOutputFrame: false });
