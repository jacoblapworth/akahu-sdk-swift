const { promisify } = require('util');
const { exec } = require('child_process');
const {
  taskRunner,
  isWindowsPlatform,
  convertExecTaskToWindows,
  taskRunnerReturns,
} = require('../helpers');
const asyncExec = promisify(exec);
const { succeed, fail } = taskRunnerReturns;

function build() {
  return taskRunner(async taskSpinner => {
    let execTask = './node_modules/.bin/tsc';

    if (isWindowsPlatform) {
      execTask = convertExecTaskToWindows(execTask);
    }

    taskSpinner.info(`Executing task: ${execTask}`);
    try {
      await asyncExec(execTask, { stdio: [0, 1, 2] });
      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = build;
require('make-runnable/custom')({ printOutputFrame: false });
