const path = require('path');
const minify = require('./private/minify');
const postcssXui = require('../postcss/xui');
const { taskRunner, rootDirectory, taskRunnerReturns } = require('../../helpers');
const { succeed, fail } = taskRunnerReturns;

const files = ['xui', 'xui-base'];

function cssmin() {
  return taskRunner(async taskSpinner => {
    try {
      await postcssXui();

      await Promise.all(
        files.map(file => {
          return minify(
            {
              input: path.resolve(rootDirectory, '.tmp', `${file}.css`),
              output: path.resolve(rootDirectory, 'dist', 'css', `${file}.min.css`),
              shorthandCompacting: false,
              roundingPrecision: -1,
              sourceMap: false,
              rebaseTo: path.resolve(rootDirectory, 'dist'),
            },
            taskSpinner,
          );
        }),
      );

      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = cssmin;
require('make-runnable/custom')({
  printOutputFrame: false,
});
