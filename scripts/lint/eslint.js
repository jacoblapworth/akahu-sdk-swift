const { exec } = require('child_process');
const { isWindowsPlatform, convertExecTaskToWindows } = require('../helpers');

const ignorePatterns = ['scripts', 'src/react/components/*/__tests__/*-test.js'];

async function eslint() {
  const args = [
    '--color',
    '--ignore-path .gitignore',
    ...ignorePatterns.map(ignorePattern => `--ignore-pattern "${ignorePattern}"`),
    ...process.argv
      .splice(process.argv.indexOf('--') + 1)
      // Escape arguments that are not flags to prevent the shell from expanding globs.
      .map(argument => (argument.startsWith('-') ? argument : `'${argument}'`)),
  ];

  let execTask = `./node_modules/.bin/eslint ${args.join(' ')}`;

  if (isWindowsPlatform) {
    execTask = convertExecTaskToWindows(execTask);
  }

  const exitCode = await new Promise(resolve => {
    const task = exec(execTask);
    task.stderr.pipe(process.stderr);
    task.stdout.pipe(process.stdout);
    task.on('exit', code => resolve(code));
  });

  if (exitCode !== 0) {
    process.exitCode = exitCode;
  }
}

module.exports = eslint;
require('make-runnable/custom')({ printOutputFrame: false });
