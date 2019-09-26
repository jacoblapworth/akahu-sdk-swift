const { execSync } = require('child_process');
const chalk = require('chalk');
const {
  Performance,
  logTaskTitle,
  logScriptRunOutput,
  twoDecimals,
  isWindowsPlatform,
  convertExecTaskToWindows,
} = require('../helpers');
const perf = new Performance();

function test(...args) {
  let command;
  const hasArgs = args && args.length > 0;
  const { u, coverage, watch, ci, cache } = hasArgs && args[0];
  const cmdLineArgs = {
    '--env=jsdom': true, // always
    '--no-cache': !cache || !hasArgs,
    '--coverage': hasArgs && coverage,
    '--watch': hasArgs && watch,
    '-u': hasArgs && u,
  };

  let craftedArgs = '';

  Object.keys(cmdLineArgs).forEach(key => {
    if (cmdLineArgs[key]) {
      craftedArgs === '' ? (craftedArgs = key) : (craftedArgs += ` ${key}`);
    }
  });

  const environmentVars = {
    'NODE_ENV=test': true,
    'TEAMCITY_VERSION=\\"9.1.7\\"': ci,
  };

  let craftedEnv = '';

  Object.keys(environmentVars).forEach(key => {
    if (environmentVars[key]) {
      craftedEnv === '' ? (craftedEnv = key) : (craftedEnv += ` ${key}`);
    }
  });

  logTaskTitle(__filename);
  perf.start();

  command = `./node_modules/.bin/cross-env ${craftedEnv} ./node_modules/.bin/jest --config ./jest.config.js ${craftedArgs}`;

  if (isWindowsPlatform) {
    command = convertExecTaskToWindows(command);
  }

  execSync(command, { stdio: [0, 1, 2] });

  perf.stop();
  logScriptRunOutput(twoDecimals(perf.delta), result => {
    return `Testing task took ${result} to run`;
  });
  return chalk.blue('Finished with testing');
}

module.exports = test;
require('make-runnable/custom')({ printOutputFrame: false });
