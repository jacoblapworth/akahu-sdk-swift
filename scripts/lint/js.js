/* eslint-disable no-console */
const { promisify } = require('util');
const { exec } = require('child_process');
const { taskRunner } = require('../helpers');
const asyncExec = promisify(exec);

function executeTask(task) {
	return asyncExec(task, {
		stdio: [0, 1, 2]
	});
}

function lint(fix, customTaskFile) {
	return taskRunner(taskSpinner => {
		const execTask = `./node_modules/.bin/eslint .${
			fix ? ' --fix' : ''
		} --color always`;
		taskSpinner.info(`Executing task: ${execTask}`);
		if (fix) {
			taskSpinner.warn(
				"The fix command can't fix all the issues, sometimes you gotta do things manually"
			);
		}
		return executeTask(execTask).catch(error => {
			// This may seem counter intuitive.
			// I put the full blame on eslint exiting with code 1
			// And putting the result of the "failure" in stdout
			return { stderr: error.stdout };
		});
	}, customTaskFile || __filename);
}

module.exports = lint;
require('make-runnable/custom')({ printOutputFrame: false });
