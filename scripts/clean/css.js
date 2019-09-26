/* eslint-disable no-console */
const path = require('path');
const { rootDirectory, taskRunner } = require('../helpers');
const clean = require(path.resolve('scripts', 'clean', 'private', 'cleanDir.js'));

const distCSSDirectory = path.resolve(rootDirectory, 'dist', 'css');

function cleanCss() {
  return taskRunner(() => clean(distCSSDirectory), __filename);
}

module.exports = cleanCss;
require('make-runnable/custom')({
  printOutputFrame: false,
});
