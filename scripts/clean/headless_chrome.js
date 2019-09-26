/* eslint-disable no-console */
const { promisify } = require('util');
const { exec } = require('child_process');
const { taskRunner } = require('../helpers');
const asyncExec = promisify(exec);

function chromeKiller() {
  return taskRunner(
    () =>
      asyncExec('./node_modules/.bin/chrome-killer --no-chrome --including-main-process', {
        stdio: [0, 1, 2],
      }),
    __filename,
  );
}

module.exports = chromeKiller;
require('make-runnable/custom')({ printOutputFrame: false });
