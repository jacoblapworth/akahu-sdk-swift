/* eslint-disable no-console */
const { taskRunnerReturns } = require('../../helpers');
const { promisify } = require('util');
const postcss = require('postcss');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const { succeed, fail } = taskRunnerReturns;

async function doPostCss({ inputFile, mapFile, processors, syntax, dest }, taskSpinner) {
  const css = await readFileAsync(inputFile);

  const result = await postcss(processors).process(css, {
    from: inputFile,
    to: inputFile,
    syntax,
  });

  try {
    taskSpinner && taskSpinner.info(`Writing File: ${dest || inputFile}`);
    await writeFileAsync(dest || inputFile, result.css);

    if (result.map) {
      taskSpinner && taskSpinner.info(`Writing File: ${mapFile}`);
      await writeFileAsync(mapFile, result.map);
    }

    return succeed();
  } catch (error) {
    return fail(error);
  }
}

module.exports = doPostCss;
