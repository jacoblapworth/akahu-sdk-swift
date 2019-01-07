/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
const mkdirp = require('mkdirp');
const { performance } = require('perf_hooks');
const ora = require('ora');

const isWindowsPlatform = process.platform === 'win32';

const convertExecTaskToWindows = execTask => execTask.replace(/\//g, '\\');

function logScriptRunOutput(time, taskName) {
	const sentimentalLogColor = parseFloat(time) > 5 ? 'red' : 'green';
	const colouredTime = chalk[sentimentalLogColor](`${time}s`);
	const message = `${taskName} took ${colouredTime} to run`;
	return message;
}

const twoDecimals = num => Math.round(num * 100) / 100;

const rootDirectory = process.cwd();

function createFolderIfNotExists(folderPath) {
	return new Promise(resolve => {
		let result = chalk.yellow(`Folder "${folderPath}" exists, skipping...`);
		if (!fs.existsSync(folderPath)) {
			mkdirp.sync(folderPath);
			result = chalk.green(`Folder "${folderPath}" created...`);
		}
		resolve(result);
	});
}

function copyFile(from, to) {
	return fs.createReadStream(from).pipe(fs.createWriteStream(to));
}

class CaptureScriptPerformance {
	constructor() {
		this.startTime = 0;
		this.endTime = 0;
		this.delta = 0;
	}
	start() {
		this.startTime = performance.now();
	}
	stop() {
		this.endTime = performance.now();
		this.delta = twoDecimals((this.endTime - this.startTime) / 1000);
	}
}

function logTaskTitle(runningTaskFileName, noDisplay) {
	let task;
	if (isWindowsPlatform) {
		task = runningTaskFileName
			.split('scripts\\')[1]
			.split('.js')[0]
			.replace(/\\/g, '/');
	} else {
		task = runningTaskFileName.split('scripts/')[1].split('.js')[0];
	}

	const parentTask = task.split('/')[0];

	const displayMessage = `Running ${chalk.underline(
		task
	)} (${parentTask}) task`;
	if (!noDisplay) {
		console.log(`\n\n${displayMessage}\n`);
	}
	return displayMessage;
}

function taskRunner(task, fileName) {
	const title = logTaskTitle(fileName, true);
	const thisTask = ora(title).start();
	const perf = new CaptureScriptPerformance();
	perf.start();

	return task(thisTask).then(({ stdout, stderr } = {}) => {
		if (stderr) {
			console.error(stderr);
			thisTask.fail(`${title} failed to finish successfully`);
			process.exit(1);
		}
		if ((stdout !== null && typeof stdout === 'string') || stdout) {
			typeof stdout === 'string' && console.log(`\n\n${stdout}`);
			thisTask.succeed(`Finished with ${title}`);
		}
		perf.stop();
		console.log(logScriptRunOutput(twoDecimals(perf.delta), title));
		return ''; // Node will otherwise print `undefined` to the console
	}).catch(reason => console.log(reason));
}

const taskRunnerReturns = {
	succeed: () => ({
		stdout: true
	}),
	fail: stderr => ({ stderr })
};

module.exports = {
	taskRunner,
	taskRunnerReturns,
	Performance: CaptureScriptPerformance,
	copyFile,
	createFolderIfNotExists,
	twoDecimals,
	logScriptRunOutput,
	rootDirectory,
	logTaskTitle,
	isWindowsPlatform,
	convertExecTaskToWindows
};
