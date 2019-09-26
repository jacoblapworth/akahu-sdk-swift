/* eslint-disable no-console */
const chalk = require('chalk');
const jestTest = require('./jest');
const { Performance, logTaskTitle, logScriptRunOutput, twoDecimals } = require('../helpers');
const perf = new Performance();

function test() {
  logTaskTitle(__filename);
  perf.start();

  jestTest({ coverage: true, noCache: true, ci: true });

  perf.stop();
  logScriptRunOutput(twoDecimals(perf.delta), result => {
    return `Testing task took ${result} to run`;
  });
  return chalk.blue('Finished with testing');
}

module.exports = test;
require('make-runnable/custom')({ printOutputFrame: false });
