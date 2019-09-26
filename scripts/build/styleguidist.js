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
  return taskRunner(taskSpinner => {
    let execTask = './node_modules/.bin/styleguidist build --config=.styleguidist/config.js';

    if (isWindowsPlatform) {
      execTask = convertExecTaskToWindows(execTask);
    }

    taskSpinner.info(`Executing task: ${execTask}`);
    taskSpinner.warn('This task has been known to take a while to complete');
    return asyncExec(execTask, { stdio: [0, 1, 2] })
      .then(succeed)
      .catch(fail);
  }, __filename);
}

module.exports = build;
require('make-runnable/custom')({ printOutputFrame: false });
