const spawn = require('cross-spawn');
const path = require('path');
const { promisify } = require('util');
const { rootDirectory, logTaskTitle } = require('../helpers');
const rimrafAsync = promisify(require('rimraf'));

const buildKss = require('../build/kss');
const buildXui = require('../build/xui');
const copyTokens = require('../build/sass/copyTokens');
const clearTokens = require('../build/sass/clearTokens');

const watch = path.resolve(rootDirectory, 'scripts', 'watch', 'all');
const storybook = path.resolve(rootDirectory, 'scripts', 'storybook', 'index.js');
const styleguideServer = path.resolve(rootDirectory, 'scripts', 'styleguide', 'index.js');
const buildServiceWorker = require('../build/serviceworker');

// Styleguidist doesn't like "built files" as well as "dev server files"
// This change is required to keep developing nicely.
function removeDistDocsReact() {
  return rimrafAsync(path.resolve(rootDirectory, 'dist', 'docs', 'react'));
}

async function watchBoth() {
  logTaskTitle(__filename);

  // Running these in parallel skews the performance metrics and does not result in a faster build
  await clearTokens();
  await copyTokens();
  await buildKss();
  await buildXui();
  await removeDistDocsReact();

  [watch, storybook, styleguideServer].forEach(watcher => {
    const childProcess = spawn('node', [watcher], { stdio: 'inherit' });
    childProcess.on('data', data => {
      console.log(data); //eslint-disable-line no-console
    });
  });

  buildServiceWorker();

  return '';
}

module.exports = watchBoth;
require('make-runnable/custom')({ printOutputFrame: false });
