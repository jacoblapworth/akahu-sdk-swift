/* eslint-disable no-console */
const { promisify } = require('util');
const fs = require('fs');
const chalk = require('chalk');
const CleanCSS = require('clean-css');
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

async function doMinifyTask({ inputFile, taskSpinner, input, output }) {
  const { styles } = await new CleanCSS({ returnPromise: true }).minify(inputFile);

  await writeFileAsync(output, styles);

  return taskSpinner.info(`${input} ${chalk.green('=>')} ${output}`);
}

const getInputFile = input => readFileAsync(input);

async function minify(options, taskSpinner) {
  const { input, output } = options;

  const inputFile = await getInputFile(input);

  return doMinifyTask({
    inputFile,
    input,
    output,
    taskSpinner,
  });
}

module.exports = minify;
