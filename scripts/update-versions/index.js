/* eslint-disable no-console */
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const { rootDirectory, taskRunner, taskRunnerReturns } = require('../helpers');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const { succeed, fail } = taskRunnerReturns;

const { edgeRegex, githubRegex, umdRegex, yamlXUIRegex, yamlReactRegex } = require('./constants');
const {
  version,
  dependencies: { react: reactVersion },
} = require('../../package.json');

const files = [
  path.resolve(rootDirectory, 'src', 'docs', 'getting-started', '_developers.scss'),
  path.resolve(rootDirectory, '.umd', 'index.html'),
  path.resolve(rootDirectory, 'xop-library.yaml'),
];

function getFile(file) {
  return readFileAsync(file, 'utf8');
}

function processFile(file, xuiVersion) {
  return file
    .replace(edgeRegex, `$1${xuiVersion}$3`)
    .replace(githubRegex, `$1${xuiVersion}`)
    .replace(umdRegex, `$1${xuiVersion}$3`)
    .replace(yamlXUIRegex, `$1${xuiVersion}$3`)
    .replace(yamlReactRegex, `$1${reactVersion}$3`);
}

function writeFile(fileName, processedFile) {
  return writeFileAsync(fileName, processedFile);
}

async function processFiles(filesToProcess = files, xuiVersion, taskSpinner) {
  try {
    const filePromises = filesToProcess.map(async file => {
      const fileToProcess = await getFile(file);
      const processedFile = await processFile(fileToProcess, xuiVersion);
      await writeFile(file, processedFile);
      await taskSpinner.info(`File written: ${file}`);
    });

    await Promise.all(filePromises);
  } catch (error) {
    throw new Error('Failed to update versions', error);
  }

  return true;
}

function updateFiles(newVersion = version) {
  return taskRunner(async taskSpinner => {
    taskSpinner.info(`Updating to version: ${newVersion}`);
    try {
      await processFiles(files, newVersion, taskSpinner);
      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = updateFiles;
require('make-runnable/custom')({
  printOutputFrame: false,
});
