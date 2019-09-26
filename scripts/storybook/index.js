/* eslint-disable no-console */
const { promisify } = require('util');
const { execSync } = require('child_process');
const { taskRunner, isWindowsPlatform, convertExecTaskToWindows } = require('../helpers');
const asyncExecSync = promisify(execSync);

function start() {
  return taskRunner(taskSpinner => {
    let execTask = './node_modules/.bin/start-storybook -p 9001 -c .storybook -s ./dist/css --ci';

    if (isWindowsPlatform) {
      execTask = convertExecTaskToWindows(execTask);
    }

    taskSpinner.info(`Executing task: ${execTask}`);
    taskSpinner.warn(
      'This is a long running task (server). The task wont stop unless you force-exit the command',
    );
    return asyncExecSync(execTask, { stdio: [0, 1, 2] });
  }, __filename);
}

module.exports = start;
require('make-runnable/custom')({ printOutputFrame: false });
