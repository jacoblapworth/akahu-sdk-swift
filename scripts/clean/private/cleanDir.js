const { promisify } = require('util');
const rimraf = require('rimraf');
const path = require('path');
const { taskRunnerReturns } = require(path.resolve('scripts', 'helpers'));
const rimrafAsync = promisify(rimraf);
const { succeed, fail } = taskRunnerReturns;

module.exports = dirOrFile => {
  return rimrafAsync(dirOrFile)
    .then(succeed)
    .catch(fail);
};
