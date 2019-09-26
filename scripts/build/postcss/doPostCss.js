/* eslint-disable no-console */
const { taskRunnerReturns } = require('../../helpers');
const { promisify } = require('util');
const postcss = require('postcss');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const { succeed, fail } = taskRunnerReturns;

function doPostCss({ inputFile, mapFile, processors, syntax, dest }, taskSpinner) {
  return readFileAsync(inputFile).then(css => {
    return postcss(processors)
      .process(css, {
        from: inputFile,
        to: inputFile,
        syntax,
      })
      .then(result => {
        taskSpinner && taskSpinner.info(`Writing File: ${dest || inputFile}`);
        return writeFileAsync(dest || inputFile, result.css)
          .then(() => {
            if (result.map) {
              taskSpinner && taskSpinner.info(`Writing File: ${mapFile}`);
              return writeFileAsync(mapFile, result.map);
            }
          })
          .then(succeed)
          .catch(fail);
      });
  });
}

module.exports = doPostCss;
