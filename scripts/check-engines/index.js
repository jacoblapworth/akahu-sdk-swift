const { promisify } = require('util');
const checkEngines = require('check-engines');
const { taskRunner, taskRunnerReturns } = require('../helpers');
const checkEnginesAsync = promisify(checkEngines);
const { succeed, fail } = taskRunnerReturns;

function runCheckEngines() {
  return taskRunner(async () => {
    try {
      await checkEnginesAsync();
      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = runCheckEngines;
require('make-runnable/custom')({ printOutputFrame: false });
