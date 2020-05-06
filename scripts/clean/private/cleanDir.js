const { promisify } = require('util');
const rimraf = require('rimraf');
const { taskRunnerReturns } = require('../../helpers');
const rimrafAsync = promisify(rimraf);
const { succeed, fail } = taskRunnerReturns;

module.exports = async dirOrFile => {
  try {
    await rimrafAsync(dirOrFile);
    return succeed();
  } catch (error) {
    return fail(error);
  }
};
