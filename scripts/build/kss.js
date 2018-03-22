const updateVersions = require('../update-versions/');
const buildKss = require('./kss/');
const postcssKss = require('./postcss/kss');
const { taskRunner, taskRunnerReturns } = require('../helpers');
const { succeed, fail } = taskRunnerReturns;

function build() {
	return taskRunner(() => {
		return updateVersions()
			.then(() => {
				buildKss().then(() => postcssKss());
			})
			.then(succeed)
			.catch(fail);
	}, __filename);
}

module.exports = build;
require('make-runnable/custom')({
	printOutputFrame: false
});
