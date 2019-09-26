/* eslint-disable no-console */
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const { rootDirectory, taskRunner, taskRunnerReturns } = require('../helpers');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const { succeed, fail } = taskRunnerReturns;

const { edgeRegex, githubRegex, umdRegex } = require('./constants');
const { version } = require(path.resolve(rootDirectory, 'package.json'));

const files = [
  path.resolve(rootDirectory, 'src', 'docs', 'working-with-xui', '_docs.developers.scss'),
  path.resolve(rootDirectory, '.umd', 'index.html'),
];

function getFile(file) {
  return readFileAsync(file, 'utf8');
}

function processFile(file, version) {
  return file
    .replace(edgeRegex, (...args) => {
      return `${args[1]}${version}${args[3]}`;
    })
    .replace(githubRegex, (...args) => {
      return `${args[1]}${version}${args[5]}`;
    })
    .replace(umdRegex, (...args) => {
      return `${args[1]}.${version}.${args[3]}`;
    });
}

function writeFile(fileName, processedFile) {
  return writeFileAsync(fileName, processedFile);
}

function processFiles(files, version, taskSpinner) {
  return new Promise((resolve, reject) => {
    let filesProcessed = 0;
    const filesToProcess = files.length;
    files.forEach(file => {
      getFile(file)
        .then(fileToProcess => processFile(fileToProcess, version))
        .then(processedFile => writeFile(file, processedFile))
        .then(() => taskSpinner.info(`File written: ${file}`))
        .then(() => (filesProcessed += 1))
        .then(() => {
          if (filesProcessed === filesToProcess) {
            resolve(true);
          }
        })
        .catch(err => {
          reject('Failed to update versions', err);
        });
    });
  });
}

function updateFiles(newVersion = version) {
  return taskRunner(taskSpinner => {
    taskSpinner.info(`Updating to version: ${newVersion}`);
    return new Promise(resolve => {
      return resolve(processFiles(files, newVersion, taskSpinner))
        .then(succeed)
        .catch(fail);
    });
  }, __filename);
}

module.exports = updateFiles;
require('make-runnable/custom')({
  printOutputFrame: false,
});
