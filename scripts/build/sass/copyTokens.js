/* eslint-disable no-console */
const {
  rootDirectory,
  createFolderIfNotExists,
  taskRunner,
  taskRunnerReturns,
  copyFileSync,
} = require('../../helpers');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const { succeed, fail } = taskRunnerReturns;

function copyTokens() {
  const files = [
    'variables.scss',
    '_colors.scss',
    '_typography.scss',
    '_structure.scss',
    '_animation.scss',
    '_layout.scss',
    '_borders.scss',
  ];

  return taskRunner(async taskSpinner => {
    try {
      await createFolderIfNotExists(path.resolve(rootDirectory, 'src', 'sass', 'tokens'));

      files.map(file => {
        const destinationPath = path.resolve(rootDirectory, 'src', 'sass', 'tokens', file);

        if (!fs.existsSync(destinationPath)) {
          console.log(`Copying token "${file}"...`);
          chalk.yellow(`Copying token "${file}"...`);

          copyFileSync(
            path.resolve(
              rootDirectory,
              'node_modules',
              '@xero',
              'xui-tokens',
              'dist',
              'sass',
              file,
            ),
            destinationPath,
          );
        } else {
          console.log(`Token "${file}" exists, skipping...`);
          chalk.green(`Token "${file}" exists, skipping...`);
        }
      });

      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = copyTokens;
require('make-runnable/custom')({
  printOutputFrame: false,
});
