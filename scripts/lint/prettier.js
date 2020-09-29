const { exec } = require('child_process');
const { isWindowsPlatform, convertExecTaskToWindows } = require('../helpers');

const ignorePatterns = ['.kss/builder/**', 'src/react/components/helpers/versions.js'];

async function prettier() {
  const args = [
    '--ignore-path .gitignore',
    ...process.argv
      .splice(process.argv.indexOf('--') + 1)
      // Escape arguments that are not flags to prevent the shell from expanding globs.
      .map(argument => (argument.startsWith('-') ? argument : `'${argument}'`)),
    ...ignorePatterns.map(ignorePattern => `'!${ignorePattern}'`),
  ];

  let execTask = `./node_modules/.bin/prettier ${args.join(' ')}`;

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

module.exports = prettier;
require('make-runnable/custom')({ printOutputFrame: false });
