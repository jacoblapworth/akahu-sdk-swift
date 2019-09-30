/**
 * I'm not sure purpose of this as nothing is put into a :root/sass folder
 */

/* eslint-disable no-console */
const { promisify } = require('util');
const path = require('path');
const rimraf = require('rimraf');
const { rootDirectory, taskRunner } = require('../helpers');
const rimrafAsync = promisify(rimraf);

const sassDirectory = path.resolve(rootDirectory, 'sass');

function cleanCss() {
  return taskRunner(
    () =>
      rimrafAsync(sassDirectory)
        .then(() => ({ stdout: true }))
        .catch(err => ({ stderr: err })),
    __filename,
  );
}

module.exports = cleanCss;
require('make-runnable/custom')({
  printOutputFrame: false,
});
