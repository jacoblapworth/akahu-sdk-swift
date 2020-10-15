/* eslint-disable no-console */
const chalk = require('chalk');
const { execSync } = require('child_process');
const fs = require('fs');
const md5File = require('md5-file');
const open = require('open');
const path = require('path');
const { argv } = require('yargs');

const Docker = require('./helpers/Docker');

const { rootDirectory } = require('../helpers');
const babelVisualRegression = require('../build/babel_visualregression');
const { Performance, logTaskTitle, logScriptRunOutput, twoDecimals } = require('../helpers');
const perf = new Performance();

async function test() {
  logTaskTitle(__filename);

  await babelVisualRegression();

  // TODO: Investigate if it's possible to run storybook as a module
  execSync('node scripts/build/storybook', (err, stdout, stderr) => {
    if (err) {
      console.error(`Exec error: ${err}`);
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });

  perf.start();

  const docker = new Docker();

  // Make sure Docker is running
  await docker.ping();

  if (argv.clean) {
    await docker.removeContainer();
    await docker.removeImage();
  }

  await docker.buildImage();
  await docker.createContainer();
  await docker.startContainer();

  // Install project dependencies inside `/.docker`
  const newDependencyHash = await new Promise(async resolve => {
    try {
      const packageHash = await md5File.sync('package.json');
      return resolve(packageHash);
    } catch (e) {
      return resolve();
    }
  });
  const currentDependencyHash = await new Promise(async resolve => {
    try {
      const packageHash = await md5File.sync('.docker/package.json');
      return resolve(packageHash);
    } catch (e) {
      return resolve();
    }
  });
  if (newDependencyHash !== currentDependencyHash) {
    console.log(chalk.blue('[Docker]'), 'Installing dependencies');
    await docker.exec(['cp', '../.npmrc', './']);
    await docker.exec(['cp', '../package.json', './']);
    await docker.exec(['cp', '../package-lock.json', './']);
    await docker.exec(['npm', 'install']);
  }

  // Copy required files from `./.visual-testing` to `/.docker/.visual-testing`
  console.log(chalk.blue('[Docker]'), 'Preparing visual regression tests');
  await docker.exec(['mkdir', '-p', '.visual-testing']);
  const filesToCopy = fs
    .readdirSync(path.resolve(rootDirectory, '.visual-testing'))
    .filter(file => file.startsWith('.') === false)
    .filter(file => file !== 'tests');
  for (const file of filesToCopy) {
    await docker.exec(['cp', '-r', `../.visual-testing/${file}`, './.visual-testing/']);
  }

  // Run visual regression tests and copy results to /.visual-testing
  console.log(chalk.blue('[Docker]'), 'Running visual regression tests');
  await docker.exec(['node', './.visual-testing/index.js', ...argv._, '--docker']);
  await docker.exec(['cp', '-r', './.visual-testing/ci-report', '../.visual-testing/']);
  await docker.exec(['cp', '-r', './.visual-testing/tests', '../.visual-testing/']);
  await docker.exec(['cp', '-r', './.visual-testing/web-report', '../.visual-testing/']);
  await docker.exec(['rm', '-rf', './.visual-testing/tests']);

  perf.stop();

  open('./.visual-testing/web-report/index.html');

  await docker.stopContainer();

  return logScriptRunOutput(twoDecimals(perf.delta), 'Visual regression tests');
}

module.exports = test;
require('make-runnable/custom')({ printOutputFrame: false });
