/* eslint-disable no-console */
const { rootDirectory, taskRunner, taskRunnerReturns } = require('../../helpers');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const { succeed, fail } = taskRunnerReturns;

function clearTokens() {
  const files = ['variables.scss', '_colors.scss'];

  return taskRunner(async taskSpinner => {
    try {
      const tokenDirectory = path.resolve(rootDirectory, 'src', 'sass', 'tokens');

      if (fs.existsSync(tokenDirectory)) {
        await Promise.all(
          files.map(file => {
            const destinationPath = path.resolve(rootDirectory, 'src', 'sass', 'tokens', file);

            if (fs.existsSync(destinationPath)) {
              console.log(`Token "${file}" exists, clearing...`);
              chalk.green(`Token "${file}" exists, clearing...`);
              fs.unlinkSync(destinationPath);
            }

            return Promise.resolve();
          }),
        );
      }

      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = clearTokens;
require('make-runnable/custom')({
  printOutputFrame: false,
});
