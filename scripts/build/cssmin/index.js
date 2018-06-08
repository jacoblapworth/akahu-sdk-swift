const path = require('path');
const minify = require('./private/minify');
const postcssXui = require('../postcss/xui');
const {
	taskRunner,
	rootDirectory,
	taskRunnerReturns,
} = require('../../helpers');
const { succeed, fail } = taskRunnerReturns;

const options = {
	input: path.resolve(rootDirectory, '.tmp', 'xui.css'),
	output: path.resolve(rootDirectory, 'dist', 'css', 'xui.min.css'),
	shorthandCompacting: false,
	roundingPrecision: -1,
	sourceMap: false,
	rebaseTo: path.resolve(rootDirectory, 'dist')
};

function cssmin() {
	return taskRunner(
		taskSpinner =>
			postcssXui()
				.then(() => minify(options, taskSpinner))
				.then(succeed)
				.catch(fail),
		__filename
	);
}

module.exports = cssmin;
require('make-runnable/custom')({
	printOutputFrame: false
});
