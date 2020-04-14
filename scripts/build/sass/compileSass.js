/* eslint-disable no-console */
const sass = require('sass');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { rootDirectory, createFolderIfNotExists, taskRunnerReturns } = require('../../helpers');
const writeFileAsync = promisify(fs.writeFile);
const sassRenderAsync = promisify(sass.render);
const { succeed, fail } = taskRunnerReturns;

async function performCompile(file, taskSpinner) {
  try {
    const result = await sassRenderAsync(file);

    await writeCompiledSass({ file, result, taskSpinner });

    return { file, result };
  } catch (error) {
    console.error(error);
    taskSpinner.fail('Failed to render sass');
    throw error;
  }
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

  filesToWrite = filesToWrite.map(async convertedFile => {
    try {
      await writeFileAsync(convertedFile.fileLocation, convertedFile.result);
      taskSpinner.info(`Created : ${convertedFile.fileLocation}`);
    } catch (error) {
      return fail(error);
    }
  });

  return Promise.all(filesToWrite);
}

/**
 * @function compileSass
 * @param {Array} files An Array of files to process via the SASS compiler
 * @param {Object} taskSpinner the Task spinner is used to display messages to the user / cli
 */
async function compileSass({ files, taskSpinner, createFolders }) {
  const folderPromises = createFolders.map(folder => createFolderIfNotExists(folder));
  const filePromises = files.map(file => performCompile(file, taskSpinner));

  try {
    await Promise.all(folderPromises);
    await Promise.all(filePromises);
    return succeed();
  } catch (error) {
    return fail(error);
  }
}

module.exports = compileSass;
require('make-runnable/custom')({
  printOutputFrame: false,
});
