/* eslint-disable no-console */
const chalk = require('chalk');
const test = require('./index');
const { Performance, logTaskTitle, logScriptRunOutput, twoDecimals } = require('../helpers');
const perf = new Performance();

function testApprove() {
  logTaskTitle(__filename);
  perf.start();

  test({ u: true });

  perf.stop();
  logScriptRunOutput(twoDecimals(perf.delta), result => {
    return `Testing task took ${result} to run`;
  });
  return chalk.blue('Finished approving snapshots');
}

module.exports = testApprove;
require('make-runnable/custom')({ printOutputFrame: false });
