const { promisify } = require('util');
const { exec } = require('child_process');
const {
  taskRunner,
  taskRunnerReturns,
  isWindowsPlatform,
  convertExecTaskToWindows,
} = require('../helpers');
const asyncExec = promisify(exec);
const { succeed, fail } = taskRunnerReturns;

function build() {
  return taskRunner(async taskSpinner => {
    let execTask = './node_modules/.bin/styleguidist build --config=.styleguidist/config.js';

    if (isWindowsPlatform) {
      execTask = convertExecTaskToWindows(execTask);
    }

    taskSpinner.info(`Executing task: ${execTask}`);
    taskSpinner.warn('This task has been known to take a while to complete');
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
