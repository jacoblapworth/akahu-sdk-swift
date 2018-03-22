const path = require('path');
const minify = require('./private/minify');
const {
	taskRunner,
	rootDirectory,
	taskRunnerReturns
} = require('../../helpers');
const { succeed, fail } = taskRunnerReturns;

const options = {
	input: path.resolve(rootDirectory, 'dist', 'css', 'xui.css'),
	output: path.resolve(rootDirectory, 'dist', 'css', 'xui.min.css'),
	shorthandCompacting: false,
	roundingPrecision: -1,
	sourceMap: false,
	rebaseTo: path.resolve(rootDirectory, 'dist')
};

function cssmin() {
	return taskRunner(
		taskSpinner =>
			minify(options, taskSpinner)
				.then(succeed)
				.catch(fail),
		__filename
	);
}

module.exports = cssmin;
require('make-runnable/custom')({
	printOutputFrame: false
});
