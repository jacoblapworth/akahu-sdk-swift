/* eslint-disable no-console */
const chalk = require('chalk');
const inquirer = require('inquirer');
const jest = require('./jest');
const visual = require('./visual');
const visualApprove = require('../backstop/approve');

const tests = {
  visual: () => visual(),
  coverage: () => jest({ coverage: true, noCache: true }),
  ci: () => jest({ coverage: true, noCache: true, ci: true }),
  jest: () => jest(),
  updateSnaps: () => jest({ u: true }),
  visualApprove: () => visualApprove(),
  watchTest: () => jest({ watch: true }),
};

const isRunningFromNPM = process.env.npm_config_argv != null;

async function testTask(...args) {
  if (args.length < 1) {
    if (isRunningFromNPM) {
      console.log(
        `\n\n${chalk.bold.inverse.black('Your attention please')}\n\n${chalk.bold.magenta(
          "I'll be running jest tests by default",
        )}\n\nIf your intent is to run another test, you may wish to use the interactive tool 'npm test -- -i' or call the node scripts/test files directly.\n\n`,
      );
    }
    jest();
  } else {
    const { i, u } = args[0];

    if (u) {
      tests.updateSnaps();
    }

    if (i) {
      console.log(`\n\n${chalk.bold('Interactive mode enabled')}\n\n`);

      const answers = await inquirer.prompt([
        {
          type: 'list',
          message: 'Pick a test to run',
          name: 'which-test',
          choices: [
            {
              name: 'Visual Regression',
              value: 'visual',
            },
            {
              name: 'Code Coverage',
              value: 'coverage',
            },
            {
              name: 'Jest',
              value: 'jest',
            },
            {
              name: 'Jest for CI',
              value: 'ci',
            },
            {
              name: 'Update snapshots',
              value: 'updateSnaps',
            },
            {
              name: 'Approve Visual Changes',
              value: 'visualApprove',
            },
            {
              name: 'Watch files for changes',
              value: 'watchTest',
            },
          ],
        },
      ]);

      tests[answers['which-test']] && tests[answers['which-test']]();
    }
  }
}

module.exports = testTask;
require('make-runnable/custom')({ printOutputFrame: false });
