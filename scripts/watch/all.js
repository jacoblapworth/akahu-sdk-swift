const spawn = require('cross-spawn');
const path = require('path');
const { rootDirectory, logTaskTitle } = require('../helpers');

const cssMin = path.resolve(rootDirectory, 'scripts', 'watch', 'cssmin');
const kss = path.resolve(rootDirectory, 'scripts', 'watch', 'kss');
const xui = path.resolve(rootDirectory, 'scripts', 'watch', 'xui');

function watchBoth() {
  logTaskTitle(__filename);

  [cssMin, kss, xui].forEach(watcher => {
    const childProcess = spawn('node', [watcher], { stdio: 'inherit' });
    childProcess.on('data', data => {
      console.log(data); //eslint-disable-line no-console
    });
  });

  return '';
}

module.exports = watchBoth;
require('make-runnable/custom')({ printOutputFrame: false });
