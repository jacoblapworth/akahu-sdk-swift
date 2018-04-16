/* eslint-disable no-console */
const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const { rootDirectory } = require('../helpers');
const checkSecurity = require(path.resolve(
	rootDirectory,
	'scripts',
	'security'
));
const updateVersion = require(path.resolve(
	rootDirectory,
	'scripts',
	'update-versions',
	'index.js'
));
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
	- ${chalk.bold.cyan(
		'alpha'
	)} : Force a new alpha, will fail if already in alpha or beta
	- ${chalk.bold.cyan(
		'beta'
	)} : Force a new beta, will fail if already in beta. Useful for skipping Alpha releases
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
	abNumeral: 1
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

if (!currentVersion.alpha && !currentVersion.beta && args.includes('alpha')) {
	newPackageJson.version = iterateVersion('alpha_new');
	intendToWriteFile = true;
}

if (!currentVersion.beta && args.includes('beta')) {
	newPackageJson.version = iterateVersion('beta_new');
	intendToWriteFile = true;
}

function writePackageJson(cb) {
	return fs.writeFile(
		packageJsonLocation,
		JSON.stringify(newPackageJson, null, 2),
		'utf8',
		err => {
			if (err) {
				console.log(chalk.red.bold('Error writing package.json file'), err);
				return;
			}

			console.log('Package JSON version updated');

			updateVersion(newPackageJson.version);

			cb();

			return;
		}
	);
}

function iterateVersion(iterateType) {
	const { major, minor, patch, abNumeral } = currentVersion;

	switch (iterateType) {
		case 'patch':
			return `${major}.${minor}.${patch + 1}`;
		case 'minor':
			return `${major}.${minor + 1}.0`;
		case 'major':
			return `${major + 1}.0.0`;
		case 'alpha_new':
			return `${major}.${minor}.${patch}-alpha.1`;
		case 'alpha++':
			return `${major}.${minor}.${patch}-alpha.${abNumeral + 1}`;
		case 'beta_new':
			return `${major}.${minor}.${patch}-beta.1`;
		case 'beta++':
			return `${major}.${minor}.${patch}-beta.${abNumeral + 1}`;
		case 'rc_new':
			return `${major}.${minor}.${patch}-rc.1`;
		case 'rc++':
			return `${major}.${minor}.${patch}-rc.${abNumeral + 1}`;
		case 'fin':
			return `${major}.${minor}.${patch}`;
	}
}

let choices = [
	{
		name: 'Patch',
		value: 'patch'
	},
	{
		name: 'Minor',
		value: 'minor'
	},
	{
		name: 'Major',
		value: 'major'
	}
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
			value: 'alpha_new'
		}
	];
}

if (currentVersion.alpha) {
	choices = [
		...choices,
		{
			name: 'Next Alpha',
			value: 'alpha++'
		},
		{
			name: 'Beta',
			value: 'beta_new'
		}
	];
}

if (currentVersion.beta) {
	choices = [
		...choices,
		{
			name: 'Next Beta',
			value: 'beta++'
		}
	];
}

if (currentVersion.rc) {
	choices = [
		...choices,
		{
			name: 'Next Release Candidate',
			value: 'rc++'
		}
	];
} else {
	choices = [
		...choices,
		{
			name: 'Release Candidate',
			value: 'rc_new'
		}
	];
}

if (currentVersion.alpha || currentVersion.beta || currentVersion.rc) {
	choices = [
		...choices,
		{
			name: `Release ${currentVersion.alpha ? 'Alpha' : ''}${
				currentVersion.beta ? 'Beta' : ''
			}${currentVersion.rc ? 'Release Candidate' : ''} as final`,
			value: 'fin'
		}
	];
}

const initialQuestion = {
	type: 'list',
	message: `Current version is ${chalk.green(version)}, New release is a:`,
	name: 'release-version',
	choices
};

if (intendToWriteFile) {
	initialQuestion.type = 'confirm';
	initialQuestion.message = `Confirm you wish to update to do ${(args.includes(
		'alpha'
	) &&
		'an alpha') ||
		(args.includes('beta') && 'a beta')} release`;
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
		if (
			parseInt(newPackageJson.version.split('.')[0]) >
			parseInt(version.split('.')[0])
		) {
			startingReleaseMessage = major;
		}
	}

	console.log(
		startingReleaseMessage(
			`Starting Release for Version ${newPackageJson.version}`
		)
	);
	writePackageJson(() => {
		checkSecurity().then(() =>
			console.log(
				chalk.green.bold(
					`Release for version ${
						newPackageJson.version
					} finished. Have a nice day!`
				)
			)
		);
	});
});
