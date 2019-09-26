const { promisify } = require('util');
const checkEngines = require('check-engines');
const { taskRunner, taskRunnerReturns } = require('../helpers');
const checkEnginesAsync = promisify(checkEngines);
const { succeed, fail } = taskRunnerReturns;

function runCheckEngines() {
  return taskRunner(() => {
    return checkEnginesAsync()
      .then(succeed)
      .catch(fail);
  }, __filename);
}

module.exports = runCheckEngines;
require('make-runnable/custom')({ printOutputFrame: false });
