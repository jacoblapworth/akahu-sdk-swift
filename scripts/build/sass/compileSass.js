/* eslint-disable no-console */
const sass = require('sass');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { rootDirectory, createFolderIfNotExists, taskRunnerReturns } = require('../../helpers');
const writeFileAsync = promisify(fs.writeFile);
const { succeed, fail } = taskRunnerReturns;

function performCompile(file, taskSpinner) {
  return new Promise((resolve, reject) =>
    sass.render(file, (err, result) => {
      if (err) {
        console.error(err);
        taskSpinner.fail('Failed to render sass');
        reject();
      }

      writeCompiledSass({ file, result, taskSpinner }).then(() => {
        resolve({ file, result });
      });
    }),
  );
}

function writeCompiledSass({ file, result, taskSpinner }) {
  let filesToWrite = [
    {
      fileLocation: path.resolve(rootDirectory, file.outFile),
      result: result.css,
    },
  ];

  if (file.sourceMap) {
    filesToWrite.push({
      fileLocation: path.resolve(rootDirectory, `${file.outFile}.map`),
      result: result.map,
    });
  }

  filesToWrite = filesToWrite.map(convertedFile => {
    return writeFileAsync(convertedFile.fileLocation, convertedFile.result)
      .then(() => {
        taskSpinner.info(`Created : ${convertedFile.fileLocation}`);
      })
      .catch(fail);
  });

  return Promise.all(filesToWrite);
}

/**
 * @function compileSass
 * @param {Array} files An Array of files to process via the SASS compiler
 * @param {Object} taskSpinner the Task spinner is used to display messages to the user / cli
 */
function compileSass({ files, taskSpinner, createFolders }) {
  const folderPromises = createFolders.map(folder => createFolderIfNotExists(folder));
  const filePromises = files.map(file => performCompile(file, taskSpinner));

  return Promise.all(folderPromises).then(() => {
    return Promise.all(filePromises)
      .then(succeed)
      .catch(fail);
  });
}

module.exports = compileSass;
require('make-runnable/custom')({
  printOutputFrame: false,
});
