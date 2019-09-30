/* eslint-disable no-console */
const { execSync } = require('child_process');
const path = require('path');
const { rootDirectory } = require('../helpers');
const chalk = require('chalk');
const babelVisualRegression = require(path.resolve(
  rootDirectory,
  'scripts',
  'build',
  'babel_visualregression.js',
));
const {
  Performance,
  logTaskTitle,
  logScriptRunOutput,
  twoDecimals,
  isWindowsPlatform,
  convertExecTaskToWindows,
} = require('../helpers');
const perf = new Performance();

function test() {
  logTaskTitle(__filename);

  return babelVisualRegression().then(() => {
    perf.start();
    let execTask = './node_modules/.bin/backstop test --config .visual-testing/index.js';

    if (isWindowsPlatform) {
      execTask = convertExecTaskToWindows(execTask);
    }

    // TODO: Investigate if it's possible to run backstop as a module
    execSync(execTask, { stdio: [0, 1, 2] });

    perf.stop();
    logScriptRunOutput(twoDecimals(perf.delta), result => {
      return `Testing task took ${result} to run`;
    });
    return chalk.blue('Finished with testing');
  });
}

module.exports = test;
require('make-runnable/custom')({ printOutputFrame: false });
