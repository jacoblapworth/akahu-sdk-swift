#!/usr/bin/env node
const path = require('path');
const compileSass = require('./compileSass');
const { rootDirectory, taskRunner } = require('../../helpers');
const cleanCSS = require('../../clean/css');

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
  return taskRunner(taskSpinner => {
    if (clean) {
      cleanCSS();
    }
    return compileSass({ files, taskSpinner, createFolders });
  }, __filename);
};
require('make-runnable/custom')({
  printOutputFrame: false,
});
