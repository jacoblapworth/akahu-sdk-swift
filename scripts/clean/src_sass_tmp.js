/* eslint-disable no-console */
const path = require('path');
const { rootDirectory, taskRunner } = require('../helpers');
const clean = require(path.resolve('scripts', 'clean', 'private', 'cleanDir.js'));

const srcSassTmpDirectory = path.resolve(rootDirectory, 'src', 'sass', 'tmp');

function cleanSassTmpDirectory() {
  return taskRunner(() => clean(srcSassTmpDirectory), __filename);
}

module.exports = cleanSassTmpDirectory;
require('make-runnable/custom')({
  printOutputFrame: false,
});
