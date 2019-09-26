const { promisify } = require('util');
const { exec } = require('child_process');
const { taskRunner, isWindowsPlatform, convertExecTaskToWindows } = require('../helpers');
const asyncExec = promisify(exec);

function checkSecurity() {
  return taskRunner(taskSpinner => {
    let execTask = './node_modules/.bin/nsp check';

    if (isWindowsPlatform) {
      execTask = convertExecTaskToWindows(execTask);
    }

    taskSpinner.info(`Executing task: ${execTask}`);
    return asyncExec(execTask, {
      stdio: [0, 1, 2],
    });
  }, __filename);
}

module.exports = checkSecurity;
require('make-runnable/custom')({ printOutputFrame: false });
