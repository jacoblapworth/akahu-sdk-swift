const generateXUIShiftTemplate = require('@xero/xuishift');
const { rootDirectory } = require('../helpers');
const path = require('path');
const modSources = ['codemod'];

process.env.NODE_ENV = 'production';

function createCodemod() {
  modSources.forEach(source => {
    const classMapPath = path.join(rootDirectory, `.${source}`, 'classReplacements.js');
    const componentTransformsPath = path.join(
      rootDirectory,
      `.${source}`,
      'componentTransforms.js',
    );
    const outputPath = path.join(rootDirectory, 'dist', `${source}`, 'index.js');

    generateXUIShiftTemplate({
      classMapPath,
      componentTransformsPath,
      outputPath,
    });
  });
}

module.exports = createCodemod;
require('make-runnable/custom')({ printOutputFrame: false });
