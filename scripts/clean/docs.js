/* eslint-disable no-console */
const path = require('path');
const { rootDirectory, taskRunner } = require('../helpers');
const clean = require('./private/cleanDir');

const docsDirectory = path.resolve(rootDirectory, 'dist', 'docs');

function cleanDocs() {
  return taskRunner(() => clean(docsDirectory), __filename);
}

module.exports = cleanDocs;
require('make-runnable/custom')({
  printOutputFrame: false,
});
