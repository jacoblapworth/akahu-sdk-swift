const { promisify } = require('util');
const { exec } = require('child_process');
const {
  taskRunner,
  taskRunnerReturns,
  isWindowsPlatform,
  convertExecTaskToWindows,
} = require('../helpers');
const postcssXui = require('./postcss/xui');
const asyncExec = promisify(exec);
const { succeed, fail } = taskRunnerReturns;

function build({ skipPostCss = false } = {}) {
  return taskRunner(async taskSpinner => {
    let execTask =
      './node_modules/.bin/cross-env BABEL_ENV=development && ./node_modules/.bin/build-storybook -c .storybook -o dist/docs/storybook';
    if (isWindowsPlatform) {
      execTask = convertExecTaskToWindows(execTask);
    }
    taskSpinner.info(`Executing task: ${execTask}`);
    taskSpinner.warn('This build has been known to take a while so sit back and relax');

    try {
      await Promise.all([
        asyncExec(execTask, {
          stdio: [0, 1, 2],
          maxBuffer: 1024 * 1200,
        }),
        !skipPostCss && postcssXui(),
      ]);
      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = build;
require('make-runnable/custom')({ printOutputFrame: false });
