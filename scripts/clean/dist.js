/* eslint-disable no-console */
const path = require('path');
const { rootDirectory, taskRunner } = require('../helpers');
const clean = require('./private/cleanDir');

const distDirectory = path.resolve(rootDirectory, 'dist');

function cleanDist() {
  return taskRunner(() => clean(distDirectory), __filename);
}

module.exports = cleanDist;
require('make-runnable/custom')({
  printOutputFrame: false,
});
