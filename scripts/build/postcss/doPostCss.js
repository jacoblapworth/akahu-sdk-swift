/* eslint-disable no-console */
const { promisify } = require('util');
const postcss = require('postcss');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

function doPostCss(
	{ inputFile, mapFile, processors, syntax, dest },
	taskSpinner
) {
	return readFileAsync(inputFile)
		.then(css => {
			postcss(processors)
				.process(css, {
					from: inputFile,
					to: inputFile,
					syntax
				})
				.then(result => {
					taskSpinner && taskSpinner.info(`Writing File: ${dest || inputFile}`);
					writeFileAsync(dest || inputFile, result.css);
					if (result.map) {
						taskSpinner && taskSpinner.info(`Writing File: ${mapFile}`);
						writeFileAsync(mapFile, result.map);
					}
				})
				.catch(error => console.log(error));
		})
		.catch(error => console.log(error));
}

module.exports = doPostCss;
