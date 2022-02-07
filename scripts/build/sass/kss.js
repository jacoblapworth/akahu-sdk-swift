#!/usr/bin/env node
const path = require('path');
const compileSass = require('./compileSass');
const {
  rootDirectory,
  taskRunner,
  taskRunnerReturns: { succeed, fail },
} = require('../../helpers');
const cleanCSS = require('../../clean/css');
const copyTokens = require('./copyTokens');

const files = [
  {
    file: path.resolve(rootDirectory, '.kss', 'scss', 'style.scss'),
    outFile: path.resolve(rootDirectory, 'dist', 'docs', 'style.css'),
    sourceMap: true,
    includePaths: ['kss/'],
  },
];

const createFolders = [path.resolve(rootDirectory, 'dist', 'docs')];

module.exports = clean => {
  return taskRunner(async taskSpinner => {
    try {
      await copyTokens();
      if (clean) {
        await cleanCSS();
      }
      await compileSass({ files, taskSpinner, createFolders });
      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
};
require('make-runnable/custom')({
  printOutputFrame: false,
});
