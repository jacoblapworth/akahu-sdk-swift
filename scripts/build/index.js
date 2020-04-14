/* eslint-disable no-console */
const { taskRunner, taskRunnerReturns } = require('../helpers');
const { succeed, fail } = taskRunnerReturns;
const sassKss = require('./sass/kss');
const xuiCss = require('./xui.js');
const buildStyleguide = require('./styleguidist.js');
const buildStorybook = require('./storybook.js');
const buildKss = require('./kss.js');
const buildTokens = require('./postcss/tokens');
const buildUmd = require('./umd_webpack.js');
const buildServiceWorker = require('./serviceworker');

async function build() {
  await taskRunner(async taskSpinner => {
    try {
      await Promise.all([sassKss(), xuiCss()]);

      taskSpinner.info('Done with basic build promises');

      const { stdout, stderr } = await Promise.all([
        buildStyleguide(),
        buildKss({
          skipPostCss: true,
        }),
        buildStorybook(),
        buildTokens(),
        buildUmd(),
      ]);
      console.log('stdout and stderr >>> ', stdout, stderr);

      await buildServiceWorker();
      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);

  process.exit(0);
}

module.exports = build;
require('make-runnable/custom')({
  printOutputFrame: false,
});
