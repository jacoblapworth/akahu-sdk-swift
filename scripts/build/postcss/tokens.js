/* eslint-disable no-console */
const {
  rootDirectory,
  createFolderIfNotExists,
  taskRunner,
  taskRunnerReturns,
} = require('../../helpers');
const path = require('path');
const doPostCss = require('./doPostCss');
const { succeed, fail } = taskRunnerReturns;

function allFiles() {
  const files = [
    path.resolve(rootDirectory, 'src', 'sass', '_vars.scss'),
    path.resolve(rootDirectory, 'src', 'sass', '_mixins.scss'),
  ];

  return taskRunner(async () => {
    try {
      await createFolderIfNotExists(path.resolve(rootDirectory, 'dist', 'tokens'));

      await Promise.all(
        files.map(file =>
          doPostCss({
            inputFile: file,
            processors: [
              require('postcss-easy-import')({
                prefix: '_',
                extensions: '.scss',
              }),
              require('postcss-discard-comments'),
            ],
            syntax: require('postcss-scss'),
            dest: path.resolve(rootDirectory, 'dist', 'tokens', 'tokens.scss'),
          }),
        ),
      );

      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = allFiles;
require('make-runnable/custom')({
  printOutputFrame: false,
});
