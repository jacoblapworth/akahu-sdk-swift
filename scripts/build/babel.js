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

function build(options = {}) {
  const { shouldOutputES6 } = options;
  const outputDir = shouldOutputES6 ? 'dist/react-es6' : 'dist/react';

  return taskRunner(async taskSpinner => {
    let execTask = `./node_modules/.bin/cross-env ${
      shouldOutputES6 ? 'ES6_OUTPUT=true' : ''
    } NODE_ENV=production ./node_modules/.bin/babel src/react/ --out-dir ${outputDir} --copy-files --source-maps --ignore **/stories,**/__tests__,**/docs,src/react/umd.js,**/*.d.ts --extensions ".js",".jsx",".ts",".tsx"`;

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
