/* eslint-disable no-console */
const lint = require('./js');

function lintFix() {
	return lint(true, __filename);
}

module.exports = lintFix;
require('make-runnable/custom')({ printOutputFrame: false });
