/* eslint-disable no-console */
const { rootDirectory, taskRunner, taskRunnerReturns, copyFile } = require('../../helpers');
const sassXui = require('../sass/xui');
const path = require('path');
const doPostCss = require('./doPostCss');
const browsers = require('@xero/browserslist-autoprefixer');
const autoprefixer = require('autoprefixer');
const mkdirp = require('mkdirp');
const { succeed, fail } = taskRunnerReturns;

const folders = [
  path.resolve(rootDirectory, 'dist', 'css'),
  path.resolve(rootDirectory, 'dist', 'docs', 'kss-assets'),
  path.resolve(rootDirectory, 'dist', 'docs', 'dist'),
  path.resolve(rootDirectory, 'dist', 'docs', 'storybook'),
];
const createFolders = folders.map(folder => mkdirp(folder));
const files = ['xui', 'xui-base'];

const copyToFolders = taskSpinner => {
  folders.forEach(folder => {
    files.forEach(file => {
      const finalFileToWrite = path.resolve(folder, `${file}.css`);
      taskSpinner.info(`Writing File: ${finalFileToWrite}`);

      copyFile(path.resolve(rootDirectory, '.tmp', `${file}.css`), finalFileToWrite);
    });
  });
};

const postcssXui = ({ skipSassXui = false } = {}) =>
  taskRunner(taskSpinner => {
    return Promise.all(createFolders)
      .then(() => {
        if (!skipSassXui) {
          return sassXui();
        } else {
          return;
        }
      })
      .then(() => {
        return Promise.all(
          files.map(file => {
            return doPostCss(
              {
                title: __filename,
                inputFile: path.resolve(rootDirectory, './.tmp', `${file}.css`),
                mapFile: path.resolve(rootDirectory, './.tmp', `${file}.css.map`),
                processors: [autoprefixer({ grid: true, overrideBrowserslist: browsers })],
              },
              taskSpinner,
            );
          }),
        );
      })
      .then(() => {
        copyToFolders(taskSpinner);
      })
      .then(succeed)
      .catch(fail);
  }, __filename);

module.exports = postcssXui;
require('make-runnable/custom')({
  printOutputFrame: false,
});
