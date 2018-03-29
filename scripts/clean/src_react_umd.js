/* eslint-disable no-console */
const path = require('path');
const { rootDirectory, taskRunner } = require('../helpers');
const clean = require(path.resolve(
	'scripts',
	'clean',
	'private',
	'cleanDir.js'
));

const srcReactUmd = path.resolve(rootDirectory, 'src', 'react', 'umd.js');

function cleanReactUmdFile() {
	return taskRunner(() => clean(srcReactUmd), __filename);
}

module.exports = cleanReactUmdFile;
require('make-runnable/custom')({
	printOutputFrame: false
});