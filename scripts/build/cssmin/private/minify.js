/* eslint-disable no-console */
const { promisify } = require('util');
const fs = require('fs');
const chalk = require('chalk');
const CleanCSS = require('clean-css');
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

function doMinifyTask({ inputFile, taskSpinner, input, output }) {
	return new CleanCSS({ returnPromise: true })
		.minify(inputFile)
		.then(async ({ styles }) => await writeFileAsync(output, styles))
		.then(() => taskSpinner.info(`${input} ${chalk.green('=>')} ${output}`));
}

const getInputFile = input => readFileAsync(input);

function minify(options, taskSpinner) {
	const { input, output } = options;

	return getInputFile(input)
		.then(inputFile =>
			doMinifyTask({
				inputFile,
				input,
				output,
				taskSpinner
			})
		);
}

module.exports = minify;
