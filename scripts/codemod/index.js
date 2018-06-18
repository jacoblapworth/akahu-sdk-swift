const generateXUIShiftTemplate = require('@xero/xuishift');
const { rootDirectory } = require('../helpers');
const path = require('path');
const classMapPath = path.join(rootDirectory, '.codemod', 'classReplacements.js');
const componentTransformsPath = path.join(rootDirectory, '.codemod', 'componentTransforms.js');
const outputPath = path.join(rootDirectory, 'dist', 'codemod', 'index.js');

process.env.NODE_ENV = 'production';

function createCodemod() {
	generateXUIShiftTemplate({
		classMapPath,
		componentTransformsPath,
		outputPath
	});
}

module.exports = createCodemod;
require('make-runnable/custom')({ printOutputFrame: false });
