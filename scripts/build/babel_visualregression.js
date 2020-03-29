const { promisify } = require('util');
const { exec } = require('child_process');
const { taskRunner, isWindowsPlatform, convertExecTaskToWindows } = require('../helpers');
const asyncExec = promisify(exec);

function build() {
  return taskRunner(taskSpinner => {
    let execTask =
      './node_modules/.bin/cross-env BABEL_ENV=test NODE_ENV=production ./node_modules/.bin/babel src/react/ --out-dir .tmp/react-visualregression --copy-files --source-maps --ignore **/__tests__,**/docs --extensions ".js",".jsx",".ts",".tsx" --ignore **/*.d.ts';

    if (isWindowsPlatform) {
      execTask = convertExecTaskToWindows(execTask);
    }

    taskSpinner.info(`Executing task: ${execTask}`);
    return asyncExec(execTask, { stdio: [0, 1, 2] });
  }, __filename);
}

module.exports = build;
require('make-runnable/custom')({ printOutputFrame: false });
