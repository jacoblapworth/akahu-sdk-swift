const buildKss = require('./kss/');
const postcssKss = require('./postcss/kss');
const { taskRunner, taskRunnerReturns } = require('../helpers');
const { succeed, fail } = taskRunnerReturns;

function build({ skipPostCss = false } = {}) {
	return taskRunner(() => {
		return buildKss()
			.then(() => (!skipPostCss && postcssKss() || true))
			.then(succeed)
			.catch(fail);
	}, __filename);
}

module.exports = build;
require('make-runnable/custom')({
	printOutputFrame: false
});
