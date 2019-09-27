/* eslint-disable no-console */
const { promisify } = require('util');
const { exec } = require('child_process');
const path = require('path');
const createEntryPoint = require('../umd/create_entry_point');
const asyncExec = promisify(exec);
const {
  taskRunner,
  rootDirectory,
  copyFile,
  taskRunnerReturns,
  isWindowsPlatform,
  convertExecTaskToWindows,
} = require('../helpers');
const { succeed, fail } = taskRunnerReturns;

function build() {
  return taskRunner(taskSpinner => {
    return createEntryPoint()
      .then(() => {
        let execTask =
          './node_modules/.bin/cross-env NODE_ENV=production ./node_modules/.bin/webpack --config webpack.umd.config.js --color=always';

        if (isWindowsPlatform) {
          execTask = convertExecTaskToWindows(execTask);
        }

        taskSpinner.info(`Executing task: ${execTask}`);
        asyncExec(execTask, { stdio: [0, 1, 2] }).then(({ stdout }) => {
          console.log(stdout);
          copyFile(
            path.resolve(rootDirectory, '.umd', 'index.html'),
            path.resolve(rootDirectory, 'dist', 'umd', 'index.html'),
          );
        });
      })
      .then(succeed)
      .catch(fail);
  }, __filename);
}

module.exports = build;
require('make-runnable/custom')({ printOutputFrame: false });
