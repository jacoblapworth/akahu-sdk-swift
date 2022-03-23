/* eslint-disable no-console */
const chalk = require('chalk');
const { execSync } = require('child_process');
const fs = require('fs');
const open = require('open');
const path = require('path');
const { argv } = require('yargs');

const {
  logScriptRunOutput,
  logTaskTitle,
  Performance,
  rootDirectory,
  twoDecimals,
} = require('../helpers');
const babelVisualRegression = require('../build/babel_visualregression');
const Docker = require('./helpers/Docker');
const md5FileHash = require('./helpers/md5FileHash');

async function runVisualRegressionTestsInDocker() {
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

  const perf = new Performance();
  perf.start();

  const docker = new Docker();

  // Make sure Docker is running
  await docker.ping();

  const newNodeVersion = md5FileHash('.nvmrc');
  const currentNodeVersion = md5FileHash('.docker/.nvmrc');
  if (argv.clean || newNodeVersion !== currentNodeVersion) {
    await docker.removeContainer();
    await docker.removeImage();
  }

  await docker.buildImage();
  await docker.createContainer();
  await docker.startContainer();

  // Install project dependencies inside `/.docker`
  const newDependencyHash = md5FileHash('package.json');
  const currentDependencyHash = md5FileHash('.docker/package.json');

  if (newDependencyHash !== currentDependencyHash) {
    console.log(chalk.blue('[Docker]'), 'Installing dependencies');
    await docker.exec(['cp', '../.npmrc', './']);
    await docker.exec(['cp', '../package.json', './']);
    await docker.exec(['cp', '../package-lock.json', './']);
    await docker.exec(['npm', 'install']);
  }
  if (currentNodeVersion !== newNodeVersion) {
    await docker.exec(['cp', '../.nvmrc', './']);
  }

  // Copy required files from `./.visual-testing` to `/.docker/.visual-testing`
  console.log(chalk.blue('[Docker]'), 'Preparing visual regression tests');

  try {
    await docker.exec(['mkdir', '-p', '.visual-testing']);
    // eslint-disable-next-line no-empty
  } catch {}

  const filesToCopy = fs
    .readdirSync(path.resolve(rootDirectory, '.visual-testing'))
    .filter(file => file.startsWith('.') === false)
    .filter(file => file !== 'tests');

  await Promise.all(
    filesToCopy.map(file =>
      docker.exec(['cp', '-r', `../.visual-testing/${file}`, './.visual-testing/']),
    ),
  );

  // Run visual regression tests and copy results to /.visual-testing
  console.log(chalk.blue('[Docker]'), 'Running visual regression tests');

  try {
    await docker.exec(['node', './.visual-testing/index.js', ...argv._, '--docker']);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }

  await docker.exec(['cp', '-r', './.visual-testing/ci-report', '../.visual-testing/']);
  await docker.exec(['cp', '-r', './.visual-testing/tests', '../.visual-testing/']);
  await docker.exec(['cp', '-r', './.visual-testing/web-report', '../.visual-testing/']);
  await docker.exec(['rm', '-rf', './.visual-testing/tests']);

  perf.stop();

  open('./.visual-testing/web-report/index.html');

  await docker.stopContainer();

  return logScriptRunOutput(twoDecimals(perf.delta), 'Visual regression tests');
}

module.exports = runVisualRegressionTestsInDocker;
require('make-runnable/custom')({ printOutputFrame: false });
