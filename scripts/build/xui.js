const path = require('path');

const sassXui = require('./sass/xui');
const postcssXui = require('./postcss/xui');
const minify = require('./cssmin/private/minify');

const {
	taskRunner,
	rootDirectory,
	taskRunnerReturns,
} = require('../helpers');
const { succeed, fail } = taskRunnerReturns;

function buildXui() {
	return taskRunner(
		taskSpinner =>
			sassXui() // Compiles the sass to css and puts it in the `./.tmp/` folder.
				.then(() => postcssXui({
					skipSassXui: true
				})) // Converts the sass in the `./.tmp/` folder by running autoprefixer over it
				.then(() => { // Runs and builds the minified files.
					const files = ['xui', 'xui-base'];
					return Promise.all(files.map(file => {
						return minify({
							input: path.resolve(rootDirectory, '.tmp', `${file}.css`),
							output: path.resolve(rootDirectory, 'dist', 'css', `${file}.min.css`),
							shorthandCompacting: false,
							roundingPrecision: -1,
							sourceMap: false,
							rebaseTo: path.resolve(rootDirectory, 'dist')
						}, taskSpinner);
					}));
				})
				.then(succeed)
				.catch(fail),
		__filename
	);
}

module.exports = buildXui;
require('make-runnable/custom')({
	printOutputFrame: false
});
