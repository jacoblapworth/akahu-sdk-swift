const kss = require('kss');
const { taskRunner, taskRunnerReturns } = require('../../helpers');
const kssSass = require('../sass/kss');
const kssTmp = require('./tmp');
const postcssXui = require('../postcss/xui');
const kssConfig = require('./config.json');
const { succeed, fail } = taskRunnerReturns;

module.exports = ({ skipPostCss = false } = {}) => {
  return taskRunner(async taskSpinner => {
    await kssTmp();

    const tasks = [kssSass];

    if (!skipPostCss) {
      tasks.push(postcssXui);
    }

    await Promise.all(tasks);

    taskSpinner.info('Built pre-requisites');

    try {
      await kss(kssConfig);

      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
};
require('make-runnable/custom')({
  printOutputFrame: false,
});
