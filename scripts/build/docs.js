const buildDocs = require('./docs/');
const { taskRunner, taskRunnerReturns } = require('../helpers');
const { succeed, fail } = taskRunnerReturns;

function build() {
  return taskRunner(async () => {
    try {
      await buildDocs();
      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = build;
require('make-runnable/custom')({
  printOutputFrame: false,
});
