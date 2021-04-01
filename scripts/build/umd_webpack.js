/* eslint-disable no-console */
const chalk = require('chalk');
const webpack = require('webpack');
const createEntryPoint = require('../umd/create_entry_point');
const webpackConfig = require('../../webpack.umd.config');
const { taskRunner, taskRunnerReturns } = require('../helpers');

const { succeed, fail } = taskRunnerReturns;

function build() {
  return taskRunner(async taskSpinner => {
    try {
      await createEntryPoint();

      process.env.NODE_ENV = 'production';

      await new Promise((resolve, reject) => {
        webpack(webpackConfig, (error, stats) => {
          if (error) {
            console.error(chalk.blue('[Webpack]'), error.stack || error);
            if (error.details) {
              console.error(chalk.blue('[Webpack]'), error.details);
            }
            return reject();
          }

          const info = stats.toJson();

          console.log(chalk.blue('[Webpack]'), `Hash: ${info.hash}`);
          console.log(chalk.blue('[Webpack]'), `Version: webpack ${chalk.bold(info.version)}`);
          console.log(chalk.blue('[Webpack]'), `Time: ${chalk.bold(info.time)}ms`);
          console.log(chalk.blue('[Webpack]'), `${chalk.bold('Assets')}`);
          info.assets.forEach(asset => {
            console.log(
              chalk.blue('[Webpack]'),
              (asset.isOverSizeLimit ? chalk.bold.yellow : chalk.bold.green)(asset.name),
              (asset.isOverSizeLimit ? chalk.bold.yellow : chalk)(
                `${Number((asset.size / 1024).toPrecision(3))} KiB`,
              ),
            );
          });

          if (stats.hasErrors()) {
            info.errors.forEach(errorInfo => {
              console.error(chalk.blue('[Webpack]'), chalk.bold(`ERROR in ${errorInfo}\n`));
            });
          }

          if (stats.hasWarnings()) {
            info.warnings.forEach(warningInfo => {
              console.warn(chalk.blue('[Webpack]'), chalk.bold(`WARNING in ${warningInfo}\n`));
            });
          }

          return resolve();
        });
      });

      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = build;
require('make-runnable/custom')({ printOutputFrame: false });
