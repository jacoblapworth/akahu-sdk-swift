/* eslint-disable no-console */
const path = require('path');
const { rootDirectory, taskRunner } = require('../helpers');
const clean = require('./private/cleanDir');

const reactDirectory = path.resolve(rootDirectory, 'dist', 'react');

function cleanReact() {
  return taskRunner(() => clean(reactDirectory), __filename);
}

module.exports = cleanReact;
require('make-runnable/custom')({
  printOutputFrame: false,
});
