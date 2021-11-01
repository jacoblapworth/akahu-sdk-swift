const fs = require('fs');
const path = require('path');

const rewriteWithSelector = require('./private/rewriteWithSelector');
const xuiDocsVersion = require('./private/xuiDocsVersion');
const { taskRunner, taskRunnerReturns } = require('../../helpers');
const { succeed, fail } = taskRunnerReturns;

function addVersionSelector() {
  return taskRunner(async () => {
    try {
      const dir = path.join('dist', 'docs', xuiDocsVersion);
      const reactDir = path.join(dir, 'react');
      const hasReactDocs = fs.existsSync(reactDir);
      const cssDocs = fs.readdirSync(dir);

      cssDocs
        .map(file => path.join(dir, file))
        .filter(file => file.endsWith('.html'))
        .forEach(file => rewriteWithSelector(file, xuiDocsVersion, false, hasReactDocs));

      if (fs.existsSync(reactDir)) {
        const reactDocs = fs.readdirSync(reactDir);
        reactDocs
          .map(file => path.join(reactDir, file))
          .filter(file => file.endsWith('.html'))
          .forEach(file => rewriteWithSelector(file, xuiDocsVersion, true, hasReactDocs));
      }

      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = addVersionSelector;
require('make-runnable/custom')({
  printOutputFrame: false,
});
