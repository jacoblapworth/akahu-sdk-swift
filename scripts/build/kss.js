const buildKss = require('./kss/');
const postcssKss = require('./postcss/kss');
const { taskRunner, taskRunnerReturns } = require('../helpers');
const { succeed, fail } = taskRunnerReturns;

function build({ skipPostCss = false } = {}) {
  return taskRunner(async () => {
    try {
      await buildKss();
      if (!skipPostCss) {
        await postcssKss();
      }

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
