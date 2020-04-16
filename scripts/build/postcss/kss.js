/* eslint-disable no-console */
const { rootDirectory, taskRunner, taskRunnerReturns } = require('../../helpers');
const path = require('path');
const sassKss = require('../sass/kss');
const doPostCss = require('./doPostCss');
const browsers = require('@xero/browserslist-autoprefixer');
const autoprefixer = require('autoprefixer');
const { succeed, fail } = taskRunnerReturns;

const postcssKss = () => {
  return taskRunner(async taskSpinner => {
    await sassKss();

    try {
      await doPostCss(
        {
          inputFile: path.resolve(rootDirectory, 'dist', 'docs', 'style.css'),
          mapFile: path.resolve(rootDirectory, 'dist', 'docs', 'style.css.map'),
          processors: [autoprefixer({ overrideBrowserslist: browsers })],
        },
        taskSpinner,
      );

      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
};

module.exports = postcssKss;
require('make-runnable/custom')({
  printOutputFrame: false,
});
