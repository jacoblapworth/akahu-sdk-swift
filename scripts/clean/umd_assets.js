/* eslint-disable no-console */
const path = require('path');
const { rootDirectory, taskRunner } = require('../helpers');
const clean = require('./private/cleanDir');

const umdAssets = path.resolve(rootDirectory, 'umd', 'assets');

function cleanUmdAssets() {
  return taskRunner(() => clean(umdAssets), __filename);
}

module.exports = cleanUmdAssets;
require('make-runnable/custom')({
  printOutputFrame: false,
});
