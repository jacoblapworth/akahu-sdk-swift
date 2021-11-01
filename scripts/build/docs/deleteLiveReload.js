const fs = require('fs');
const path = require('path');

const getFiles = require('./private/getFiles');
const xuiDocsVersion = require('./private/xuiDocsVersion');
const { taskRunner, taskRunnerReturns } = require('../../helpers');
const { succeed, fail } = taskRunnerReturns;

function deleteLiveReload() {
  return taskRunner(async () => {
    try {
      const files = await getFiles(path.resolve('dist', 'docs', xuiDocsVersion));

      files.forEach(file => {
        if (path.extname(file) !== '.html') {
          return;
        }

        const contents = fs.readFileSync(file, 'utf-8');
        const newContents = contents.replace(/<.*livereload\.js.*>/gm, '');
        fs.writeFileSync(file, newContents);
      });

      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = deleteLiveReload;
require('make-runnable/custom')({
  printOutputFrame: false,
});
