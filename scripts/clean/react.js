/* eslint-disable no-console */
const path = require('path');
const { rootDirectory, taskRunner } = require('../helpers');
const clean = require(path.resolve('scripts', 'clean', 'private', 'cleanDir.js'));

const reactDirectory = path.resolve(rootDirectory, 'dist', 'react');

function cleanReact() {
  return taskRunner(() => clean(reactDirectory), __filename);
}

module.exports = cleanReact;
require('make-runnable/custom')({
  printOutputFrame: false,
});
