/* eslint-disable no-console */
const { promisify } = require('util');
const { exec } = require('child_process');
const { taskRunner, isWindowsPlatform, convertExecTaskToWindows } = require('../helpers');
const asyncExec = promisify(exec);

function lint() {
  return taskRunner(
    taskSpinner => {
      let execTask = './node_modules/.bin/stylelint --syntax scss ./src/sass/**/*.scss';

      if (isWindowsPlatform) {
        execTask = convertExecTaskToWindows(execTask);
      }
      taskSpinner.info(`Executing task: ${execTask}`);
      return asyncExec(execTask, {
        stdio: [0, 1, 2],
      });
    },

    __filename,
  );
}

module.exports = lint;
require('make-runnable/custom')({ printOutputFrame: false });
