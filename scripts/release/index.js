/* eslint-disable no-console */
const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const { rootDirectory } = require('../helpers');
// TODO: Is this being replace with something else down the track?
const checkSecurity = () => Promise.resolve();
// const checkSecurity = require(path.resolve(
// 	rootDirectory,
// 	'scripts',
// 	'security'
// ));
const updateVersion = require('../update-versions/index');
const updateVersionForCheckXUIVersionJsFile = require('../versions/versions');
const packageLockUpdate = require('./package-lock-update');

const packageJsonLocation = path.resolve(rootDirectory, 'package.json');
const packageJson = require(packageJsonLocation);

const { version } = packageJson;
const newPackageJson = { ...packageJson };

const args = process.argv.slice(2);

let intendToWriteFile = false;

const helpTemplate = `
${chalk.bold.blue('Help Menu')}
---------------------
Run with no arguments for an interactive menu
---------------------
Optional arguments
	- ${chalk.bold.cyan('-h')}, ${chalk.bold.cyan('-help')} : Runs this help menu
	- ${chalk.bold.cyan('alpha')} : Force a new alpha, will fail if already in alpha or beta
	- ${chalk.bold.cyan(
    'beta',
  )} : Force a new beta, will fail if already in beta. Useful for skipping Alpha releases
	- ${chalk.bold.cyan(
    'patch',
  )} : Force a new patch, updates UP to the next patch, 1.0.0 will go to 1.0.1 as will 1.0.0-beta|alpha
	- ${chalk.bold.cyan(
    'minor',
  )} : Force a new beta, updates UP to the next minor, 1.0.0 will go to 1.1.0 as will 1.0.0-beta|alpha
	- ${chalk.bold.cyan(
    'major',
  )} : Force a new alpha, updates UP to the next major, 1.0.0 will go to 2.0.0 as will 1.0.0-beta|alpha

	- ${chalk.bold.cyan(
    '<major|minor|patch> <alpha|beta|rc>',
  )} : Allows you to upgrade to the next major, minor or patch AND go alpha or beta or RC at the same time. e.g '-- minor alpha' gives you 13.3.0 -> 13.4.0-alpha.1.
---------------------
`;
if (args.includes('-h') || args.includes('-help')) {
  console.log(helpTemplate);
  return;
}

const currentVersion = {
  major: 0,
  minor: 0,
  patch: 0,
  alpha: false,
  beta: false,
  rc: false,
  abNumeral: 1,
};

const versionParts = version.split('.');
currentVersion.major = parseInt(versionParts[0]);
currentVersion.minor = parseInt(versionParts[1]);
currentVersion.patch = parseInt(versionParts[2].split('-')[0]);
currentVersion.alpha = versionParts[2].split('-')[1] === 'alpha';
currentVersion.beta = versionParts[2].split('-')[1] === 'beta';
currentVersion.rc = versionParts[2].split('-')[1] === 'rc';
currentVersion.abNumeral =
  (versionParts[3] && parseInt(versionParts[3])) || currentVersion.abNumeral;

// Ordering is important, because you might go '-- major minor alpha' and go from 13.0.0 to 14.1.0-beta.1 for some reason
// And that reason might be important, but it's easier to setup support for it now than later on and it doesn't really
// Affect anything otherwise.
// This will work for chains '-- major minor' as well as non-chains '-- major'
if (args.includes('major')) {
  newPackageJson.version = iterateVersion('major');
  intendToWriteFile = true;
}
if (args.includes('minor')) {
  newPackageJson.version = iterateVersion('minor');
  intendToWriteFile = true;
}
if (args.includes('patch')) {
  newPackageJson.version = iterateVersion('patch');
  intendToWriteFile = true;
}
if (args.includes('alpha')) {
  if (currentVersion.beta || currentVersion.rc) {
    console.log(
      chalk.red.bold(
        `You can't do an alpha release after a beta or RC release has already occurred, current version ${version}`,
      ),
    );
    return;
  }
  newPackageJson.version = currentVersion('alpha')
    ? iterateVersion('alpha++')
    : iterateVersion('alpha_new');
  intendToWriteFile = true;
}
if (args.includes('beta')) {
  if (currentVersion.rc) {
    console.log(
      chalk.red.bold(
        `You can't do a beta release after an RC release has already occurred, current version ${version}`,
      ),
    );
    return;
  }
  newPackageJson.version = currentVersion.beta
    ? iterateVersion('beta++')
    : iterateVersion('beta_new');
  intendToWriteFile = true;
}
if (args.includes('rc')) {
  newPackageJson.version = currentVersion.rc ? iterateVersion('rc++') : iterateVersion('rc_new');
  intendToWriteFile = true;
}

function writePackageJson(cb) {
  return fs.writeFile(
    packageJsonLocation,
    `${JSON.stringify(newPackageJson, null, 2)}\n`,
    'utf8',
    async err => {
      if (err) {
        console.log(chalk.red.bold('Error writing package.json file'), err);
        return;
      }

      console.log('Package JSON version updated');

      await updateVersion(newPackageJson.version);
      updateVersionForCheckXUIVersionJsFile(newPackageJson.version);

      cb && cb();

      return;
    },
  );
}

function iterateVersion(iterateType) {
  const { major, minor, patch, abNumeral } = currentVersion;

  switch (iterateType) {
    case 'patch':
      currentVersion.patch = currentVersion.patch + 1;
      return `${major}.${minor}.${patch + 1}`;
    case 'minor':
      currentVersion.minor = currentVersion.minor + 1;
      return `${major}.${minor + 1}.0`;
    case 'major':
      currentVersion.major = currentVersion.major + 1;
      return `${major + 1}.0.0`;
    case 'alpha_new':
      currentVersion.alpha = true;
      return `${major}.${minor}.${patch}-alpha.1`;
    case 'alpha++':
      currentVersion.alpha = true;
      currentVersion.abNumeral = currentVersion.abNumeral + 1;
      return `${major}.${minor}.${patch}-alpha.${abNumeral + 1}`;
    case 'beta_new':
      currentVersion.beta = true;
      return `${major}.${minor}.${patch}-beta.1`;
    case 'beta++':
      currentVersion.beta = true;
      currentVersion.abNumeral = currentVersion.abNumeral + 1;
      return `${major}.${minor}.${patch}-beta.${abNumeral + 1}`;
    case 'rc_new':
      currentVersion.rc = true;
      return `${major}.${minor}.${patch}-rc.1`;
    case 'rc++':
      currentVersion.rc = true;
      currentVersion.abNumeral = currentVersion.abNumeral + 1;
      return `${major}.${minor}.${patch}-rc.${abNumeral + 1}`;
    case 'fin':
      return `${major}.${minor}.${patch}`;
  }
}

let choices = [
  {
    name: 'Patch',
    value: 'patch',
  },
  {
    name: 'Minor',
    value: 'minor',
  },
  {
    name: 'Major',
    value: 'major',
  },
];

if (
  !currentVersion.beta &&
  !currentVersion.alpha &&
  !currentVersion.rc &&
  currentVersion.abNumeral <= 1
) {
  choices = [
    ...choices,
    {
      name: 'Alpha',
      value: 'alpha_new',
    },
  ];
}

if (currentVersion.alpha) {
  choices = [
    ...choices,
    {
      name: 'Next Alpha',
      value: 'alpha++',
    },
    {
      name: 'Beta',
      value: 'beta_new',
    },
  ];
}

if (currentVersion.beta) {
  choices = [
    ...choices,
    {
      name: 'Next Beta',
      value: 'beta++',
    },
  ];
}

if (currentVersion.rc) {
  choices = [
    ...choices,
    {
      name: 'Next Release Candidate',
      value: 'rc++',
    },
  ];
} else {
  choices = [
    ...choices,
    {
      name: 'Release Candidate',
      value: 'rc_new',
    },
  ];
}

if (currentVersion.alpha || currentVersion.beta || currentVersion.rc) {
  choices = [
    ...choices,
    {
      name: `Release ${currentVersion.alpha ? 'Alpha' : ''}${currentVersion.beta ? 'Beta' : ''}${
        currentVersion.rc ? 'Release Candidate' : ''
      } as final`,
      value: 'fin',
    },
  ];
}

const initialQuestion = {
  type: 'list',
  message: `Current version is ${chalk.green(version)}, New release is a:`,
  name: 'release-version',
  choices,
};

if (intendToWriteFile) {
  let messagePartBasedOnReleaseType = '';

  switch (true) {
    case args.includes('alpha'):
      messagePartBasedOnReleaseType = 'an alpha';
      break;
    case args.includes('beta'):
      messagePartBasedOnReleaseType = 'a beta';
      break;
    case args.includes('patch'):
      messagePartBasedOnReleaseType = 'a patch';
      break;
    case args.includes('minor'):
      messagePartBasedOnReleaseType = 'a minor';
      break;
    case args.includes('major'):
      messagePartBasedOnReleaseType = 'a major';
      break;
  }

  initialQuestion.type = 'confirm';
  initialQuestion.message = `Current version ${version}, Confirm you wish to update to do ${messagePartBasedOnReleaseType} release`;
  initialQuestion.name = 'update-version';
  initialQuestion.choices = undefined;
}

inquirer.prompt([initialQuestion]).then(answers => {
  const major = chalk.bold.red;
  const regular = chalk.bold.blue;
  let startingReleaseMessage = regular;

  if (answers['update-version'] != null && !answers['update-version']) {
    console.log('You chose to exit');
    process.exit(0);
  }

  if (answers['release-version'] != null) {
    newPackageJson.version = iterateVersion(answers['release-version']);
    if (parseInt(newPackageJson.version.split('.')[0]) > parseInt(version.split('.')[0])) {
      startingReleaseMessage = major;
    }
  }

  console.log(startingReleaseMessage(`Starting Release for Version ${newPackageJson.version}`));
  writePackageJson(async () => {
    await checkSecurity();
    await packageLockUpdate();
    console.log(
      chalk.green.bold(`Release for version ${newPackageJson.version} finished. Have a nice day!`),
    );
  });
});
