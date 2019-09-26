const kss = require('kss');
const { taskRunner, taskRunnerReturns } = require('../../helpers');
const kssSass = require('../sass/kss');
const kssTmp = require('./tmp');
const postcssXui = require('../postcss/xui');
const kssConfig = require('./config.json');
const { succeed, fail } = taskRunnerReturns;

module.exports = ({ skipPostCss = false } = {}) => {
  return taskRunner(taskSpinner => {
    return kssTmp().then(() => {
      const tasks = [kssSass];

      if (!skipPostCss) {
        tasks.push(postcssXui);
      }

      return Promise.all(tasks).then(() => {
        taskSpinner.info('Built pre-requisites');
        return kss(kssConfig)
          .then(succeed)
          .catch(fail);
      });
    });
  }, __filename);
};
require('make-runnable/custom')({
  printOutputFrame: false,
});
